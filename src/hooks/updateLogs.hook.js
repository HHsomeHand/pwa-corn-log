import {getDomElement, vh2px} from "@/utils/index.js";
import {useEventListener, useScroll} from "@vueuse/core";
import {throttle} from "underscore";


// 需要指定 scrollerRef 容器, 进行滚动监听
// logsCache 需要为 ref
export function useUpdateLogs(scrollerRef, storeUtils, logsCache) {
    const {getLogs, getLogsWithSeparator, generatorSeparator, generatorEnd} = storeUtils;

    let update = () => {};

    let stopTouchStart = () => {};

    let stopTouchMove = () => {};

    onUnmounted(() => {
        stopTouchStart();

        stopTouchMove();
    })

    let isEnd = ref(false);

    onMounted(async () => {
        const scrollerEl = getDomElement(scrollerRef.value);

        // 初始化日志缓存, 不带分隔符
        async function initLogs() {
            let logs = await getLogs(new Date());

            logsCache.value.push(...logs);
        }

        async function init() {
            await initLogs();

            await nextTick(() => {
                scrollerEl.scrollTop = scrollerEl.scrollHeight; // 滚动到底部
            });
        }
        await init();

        // 实现
        // - 触顶刷新
        // - 初始页面无滚动条, 上拉依旧刷新
        async function enableTopUpdate() {
            const { arrivedState } = useScroll(scrollerEl);

            const { top: isTop} = toRefs(arrivedState);

            let startY = 0;

            let isAtTopOnTouchStart;
            stopTouchStart = useEventListener(scrollerEl, 'touchstart', (event) => {
                startY = event.touches[0].pageY;

                isAtTopOnTouchStart = isTop.value;
            });

            stopTouchMove = useEventListener(scrollerEl, 'touchmove', (event) => {
                const currentY = event.touches[0].pageY;
                const deltaY = currentY - startY;

                // 只在顶部且向下拖动超过阈值时阻止默认行为
                if (isAtTopOnTouchStart && deltaY > 0) {
                    event.preventDefault();
                }

                onScroll(deltaY);
            },  { passive: false });

            const onScroll = throttle((deltaY) => {
                if (deltaY < 0) {
                    // 向上拖动会到这里, 这里要向下拖动才加载 logs
                    return;
                }

                // 如果不在顶部, 就不做处理
                if (!isTop.value) {
                    return;
                }

                // 触顶时向上拉动走这里
                update();

            }, 500);
        }
        await enableTopUpdate();

        update = async () => {
            if (isEnd.value) return;

            let date = new Date(logsCache.value[0].date); // 获取最新一条的日期

            // 如果不是分割符, 就添加分割符
            if (logsCache.value[0].type !== "separator") {
                logsCache.value.unshift(generatorSeparator(date));
            }

            // 获取前一天的日期
            date.setDate(date.getDate() - 1);

            let logs = await getLogsWithSeparator(date);

            if (logs.length === 0) {
                isEnd.value = true;
                logs.push(generatorEnd());
            }

            const prevScrollTop = scrollerEl.scrollTop;
            const prevScrollHeight = scrollerEl.scrollHeight;

            logsCache.value.unshift(...logs);

            function setScrollPos() {
                // 计算新内容的增量高度
                const heightDelta = scrollerEl.scrollHeight - prevScrollHeight;
                // 保持用户视角不变：原偏移 + 新增高度
                scrollerEl.scrollTop = prevScrollTop + heightDelta;
            }

            await nextTick(() => {
                setScrollPos();
            });
        }
    });

    function onScroll(state) {
        let {y} = state;

        if (y.value < vh2px(50)) {
            // console.log("逻辑");
            update();
        }
    }

    return {isEnd, onScroll};
}