import {getTimeDiff} from "@/utils";


export function useTimeGap(
    hint: string,
    targetDate: Ref<Date | null>,
    prefix = "",
    suffix = ""
) {

    const currentDate = ref(new Date());

    // 更新时间
    setInterval(() => {
        currentDate.value = new Date();
    }, 60 * 1000);

    const timeGap = computed(() => {
        if (targetDate.value === null) {
            return "";
        }

        const { days, hours, minutes } = getTimeDiff(
            targetDate.value,
            currentDate.value
        );

        function _fmtStr(num, fmt) {
            return (num > 0 ? ` ${num} ${fmt}` : "")
        }

        function _fmtStrEqual(num, fmt) {
            return (num >= 0 ? ` ${num} ${fmt}` : "")
        }

        return prefix +
            hint +
            // (days > 0 ? ` ${days} 天` : "") +
            _fmtStr(days, '天') +
            // (hours > 0 ? ` ${hours} 小时` : "") +
            _fmtStr(hours, '小时') +
            // (minutes > 0 ? ` ${minutes} 分钟` : "")
            _fmtStrEqual(minutes, '分钟') +
            suffix
    });

    return {
        timeGap
    }
}