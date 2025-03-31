import {generatorEnd, getDomElement, getTomorrowDate, stripTime, vh2px} from "@/utils/index.js";

// 需要指定 scrollerRef 容器, 进行滚动监听
// logsCache 需要为 ref
export function useUpdateLogs(scrollerRef, store, logsCache) {
    let isEnd = ref(false);

    // 从 indexedDB 获取数据, 保证列表的视觉效果
    let update =  async () => {
        if (!scrollerRef.value) return [];
        if (isEnd.value) return [];

        const scrollerEl = getDomElement(scrollerRef.value);

        let oldestDate = await store.getOldestDate() || new Date();

        let date = logsCache.value[0]?.date
            ? stripTime(new Date(logsCache.value[0]?.date))
            : getTomorrowDate(); // 获取最新一条的日期

        // 如果不是分割符, 就添加分割符
        // if (logsCache.value[0]?.type !== "separator") {
        //     logsCache.value.unshift(generatorSeparator(date));
        // }

        let logs = [];

        // 获取前一天的日期, 如果前一天没有数据, 就循环获取
        while (true) {
            date.setDate(date.getDate() - 1);

            logs = await store.getLogsByDate(date);

            if (logs.length !== 0) {
                break;
            }

            if (date.getTime() < oldestDate.getTime()
                && logsCache.value[0].type !== "end") {
                isEnd.value = true;
                logs.push(generatorEnd(date));
                break;
            }
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

        return logs;
    };

    // 快触顶时, 进行数据更新
    async function onScroll(state) {
        let {y} = state;

        if (y.value < vh2px(50)) {
            // console.log("逻辑");
            await update();
        }
    }

    // 更新到指定日期
    async function updateToDate(date) {
        if (isEnd.value) return;

        do {
            let logs = await update();

            if (logs.length === 0 || logs[0].type === "end") break;

            if (logs[0].date === date) break;

            if (logs[0].date.getTime() < date.getTime()) break;
        } while(true);

    }

    return {isEnd, onScroll, updateToDate, update};
}