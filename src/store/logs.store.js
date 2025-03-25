export const useLogsStore = defineStore('logs', () => {
    let list = ref([]);
    let currentDate = new Date();
    for (let i = 0; i < 5000; i++) {
        list.value.push({
            id: i,
            log: `第 ${i} 条数据`,
            date: currentDate,
        });

        if (i % 10 === 0) {
            currentDate.setDate(currentDate.getDate() - 1);
        }
    }

    async function getLogsCount() {
        return list.value.length;
    }

    async function getLogsByDate(date) {
        if (!(date instanceof Date)) {
            console.error('传入的参数必须是 Date 对象');
            return [];
        }
        return list.value.filter((item) => {
            return item.date.getTime() === date.getTime();
        })
    }

    async function getOldestDate() {
        if (list.value.length === 0) {
            return null;
        }
        let oldest = list.value[0].date;
        for (let i = 1; i < list.value.length; i++) {
            if (list.value[i].date.getTime() < oldest.getTime()) {
                oldest = list.value[i].date;
            }
        }
        return oldest;
    }

    return { getLogsCount, getLogsByDate, getOldestDate }
})