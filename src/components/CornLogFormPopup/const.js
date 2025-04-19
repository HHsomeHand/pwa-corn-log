import {ENTRY_TYPE} from "@/components/CornLogFormPopup/ENTRY_TYPE.ts"; // 不可以清理
import {generateEntry} from "@/components/CornLogFormPopup/utils.ts";
import {i18n} from "@/i18n/index.js";
import {useGlobalScopedI18n} from "@/hooks/useGlobalScopedI18n.js";

const {t} = useGlobalScopedI18n('defaultEntry');

export const LOG_ENTRY = Object.freeze(
    generateEntry({
        // "日志"
        label: t('logLabel'),
        // "请输入日志内容"
        placeholder: t('logPlaceholder'),
        isReturnSubmit: true
    }),
);

export const COMMENT_ENTRY = Object.freeze(
    generateEntry({
        //  "备注"
        label: t('commentLabel'),
        // "请输入备注内容"
        placeholder:  t('commentPlaceholder'),
    })
);

export const DEFAULT_ENTRIES = Object.freeze({
    log: {
        ...LOG_ENTRY
    },
    comment: {
        ...COMMENT_ENTRY
    },
})
