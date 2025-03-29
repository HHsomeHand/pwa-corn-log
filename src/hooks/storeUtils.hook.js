import {fmtDate} from "@/utils/index.js";


export function useStoreUtils(store) {
    // 一直获取
    // 到末尾就返回[]
    const getLogs = (() => {
        let oldestDate;

        async function _getLogs(date) {
            date = new Date(date);

            let logs = [];

            if (!oldestDate) {
                oldestDate = await store.getOldestDate();
                if (!oldestDate) {
                    oldestDate = new Date();
                }
            }

            do {
                console.log("获取日期:" + fmtDate(date));

                logs = await store.getLogsByDate(date);

                date.setDate(date.getDate() - 1);

                if (date.getTime() < oldestDate.getTime()) {
                    break;
                }
            } while (logs.length === 0);


            return logs;
        }

        return _getLogs;
    })();

    async function getLogsWithSeparator(date) {
        let logs = [];

        logs = await getLogs(date);

        if (logs.length !== 0) {
            logs.unshift(generatorSeparator(date));
        }

        return logs;
    }

    function generatorSeparator(date) {
        date = new Date(date);

        return {
            type: "separator",
            content: fmtDate(date),
            date
        }
    }

    function generatorEnd(date) {
        return {
            type: "end",
            date
        }
    }

    function getStore() {
        return store;
    }

    return {getLogs, getLogsWithSeparator, generatorSeparator, generatorEnd, getStore};
}