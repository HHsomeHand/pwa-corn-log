import { defineStore } from 'pinia';
import { ref } from 'vue';
import { openDB } from 'idb';

export const useLogStore = defineStore('logStore', () => {
    const logsCache = ref({});

    // 打开 IndexedDB，创建带日期索引的表
    // 表结构: {id, date, log, comment}
    const getDB = async () => {
        return openDB('LogDB', 1, {
            upgrade(db) {
                const store = db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
                store.createIndex('by_date', 'date'); // 创建日期索引
            },
        });
    };

    // 获取总日志数
    const getLogsCount = async () => {
        const db = await getDB();
        const tx = db.transaction('logs', 'readonly');
        return await tx.store.count();
    };

    // 按日期获取日志（支持完整时间）
    const getLogsByDate = async (date) => {
        if (!date) {
            console.error("date 参数为空");
            return []; // 如果 date 参数为空，直接返回空数组
        }

        const db = await getDB();
        const tx = db.transaction('logs', 'readonly');
        const index = tx.store.index('by_date');
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0); // 当天开始
        const nextDate = new Date(targetDate);
        nextDate.setDate(nextDate.getDate() + 1); // 下一天

        const range = IDBKeyRange.bound(targetDate, nextDate, true, false); // 当天范围
        const logs = await index.getAll(range);
        return logs.sort((a, b) => a.date - b.date); // 按时间升序
    };

    // 获取最旧的日志日期
    const getOldestDate = async () => {
        const db = await getDB();
        const tx = db.transaction('logs', 'readonly');
        const cursor = await tx.store.openCursor(null, 'prev'); // 从最后一条向前
        return cursor ? cursor.value.date : null;
    };

    // 模糊查询 log 字段
    const searchLogsByLog = async (keyword) => {
        const db = await getDB();
        const tx = db.transaction('logs', 'readonly');
        const store = tx.store;
        const logs = [];
        const cursor = await store.openCursor();

        if (!keyword) return logs;

        while (cursor) {
            const log = cursor.value;
            if (log.log.toLowerCase().includes(keyword.toLowerCase())) {
                logs.push(log);
            }
            await cursor.continue();
        }

        return logs.sort((a, b) => a.date - b.date);
    };

    // 模糊查询 comment 字段
    const searchLogsByComment = async (keyword) => {
        const db = await getDB();
        const tx = db.transaction('logs', 'readonly');
        const store = tx.store;
        const logs = [];
        const cursor = await store.openCursor();

        if (!keyword) return logs;

        while (cursor) {
            const log = cursor.value;
            if (log.comment && log.comment.toLowerCase().includes(keyword.toLowerCase())) {
                logs.push(log);
            }
            await cursor.continue();
        }

        return logs.sort((a, b) => a.date - b.date);
    };

// 生成多天的测试数据
    const generateTestData = async () => {
        const db = await getDB();
        const tx = db.transaction('logs', 'readwrite');
        const logStore = tx.objectStore('logs');
        const startDate = new Date('2025-03-25T08:00:00'); // 开始时间

        for (let i = 0; i < 200; i++) {
            const date = new Date(startDate);
            date.setHours(startDate.getHours() - Math.floor(i / 10) * 24); // 每10条减少一天
            date.setMinutes(startDate.getMinutes() - (i % 10) * 15); // 同一天内每条间隔15分钟
            const logData = {
                date,
                log: `Log entry ${i} at ${date.toLocaleTimeString()}`,
                comment: i % 4 === 0 ? `Comment for log ${i}` : undefined,
            };
            const id = await logStore.add(logData);
        }
        await tx.done;
    };

    return {
        logsCache,
        getLogsCount,
        getLogsByDate,
        getOldestDate,
        searchLogsByLog,
        searchLogsByComment,
        generateTestData,
    };
});