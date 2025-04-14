import {ENTRY_TYPE} from "@/components/CornLogFormPopup/ENTRY_TYPE.ts";
import {generateEntry} from "@/components/CornLogFormPopup/utils.ts";

export const LOG_ENTRY = Object.freeze(
    generateEntry({
        label: "日志",
        placeholder: "请输入日志内容",
        isReturnSubmit: true
    }),
);

export const COMMENT_ENTRY = Object.freeze(
    generateEntry({
        label: "备注",
        placeholder: "请输入备注内容",
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