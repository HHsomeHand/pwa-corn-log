import {getTimeDiff} from "@/utils";
import {useI18n} from "vue-i18n";


export function useTimeGap(
    hint: string,
    targetDate: Ref<Date | null>,
    prefix = "",
    suffix = ""
) {
    const {t} = useI18n();

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
            _fmtStr(days, t('time.day')) +
            // (hours > 0 ? ` ${hours} 小时` : "") +
            _fmtStr(hours, t('time.hour')) +
            // (minutes > 0 ? ` ${minutes} 分钟` : "")
            _fmtStrEqual(minutes, t('time.minute')) +
            suffix
    });

    return {
        timeGap
    }
}
