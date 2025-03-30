import {generateEntry} from "@/components/CornLogFormPopup/utils.js";

export const ENTRY_TYPE =  Object.freeze({
    DATE: 'date',
    TIME: 'time',
    STR: 'string',
})

export const LOG_ENTRY = Object.freeze({
    log: generateEntry({
        label: "日志",
        placeholder: "请输入日志内容"
    }),
});

export const COMMENT_ENTRY = Object.freeze({
    comment: generateEntry({
        label: "备注",
        placeholder: "请输入备注内容",
    }),
});

export const DEFAULT_ENTRIES = Object.freeze({
    ...LOG_ENTRY,
    ...COMMENT_ENTRY,
})