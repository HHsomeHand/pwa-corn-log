import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.js";
import {COMMENT_ENTRY, LOG_ENTRY} from "@/components/CornLogFormPopup/const.js";
import {ENTRY_TYPE} from "@/components/CornLogFormPopup/ENTRY_TYPE.js";
import {isSameDate} from "@/utils/index.js";
import type {LogEntry} from "@/model/logs.type.js";


export function useCornLog(logsCacheRef, store) {
    async function updateEntry(id, updatedData: LogEntry) {
        if (!logsCacheRef || !store) {
            throw new Error("调用 updateEntry 缺少 logsCache store");
        }
        await store.updateLog(id, updatedData);

        let logsCache = logsCacheRef.value;

        const index = logsCache.findIndex(item => item.id === id);

        if (index === -1) {
            return;
        }

        updatedData.date = new Date(updatedData.date);

        let tmpLog = {
            ...logsCache[index],
            ...updatedData,
            id, // 确保id不被覆盖
        };

        if (!tmpLog.originalDate && !isSameDate(updatedData.date, logsCache[index].date)) {
            tmpLog.originalDate = new Date(logsCache[index].date);
        }

        logsCache[index] = tmpLog;
    }

    function onCellClick(item) {
        showLogFormPopup(async (updatedData) => {
            await updateEntry(item.id, updatedData);
        }, {
            entries: {
                log: {
                    ...LOG_ENTRY,
                    defaultVal: item.log,
                },
                comment: {
                    ...COMMENT_ENTRY,
                    defaultVal: item.comment
                },
                date: {
                    type: ENTRY_TYPE.DATE,
                    defaultVal: new Date(item.date)
                }
            },
            id: item.id,
        });
    }

    return {updateEntry, onCellClick};
}