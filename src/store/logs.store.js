import { defineStore } from 'pinia';
import { ref } from 'vue';
import { openDB } from 'idb';

export const useLogStoreFactory = (storeName = 'logs') => defineStore('logStore', () => {
    const logsCache = ref({});

    // 打开 IndexedDB，创建带日期索引的表
    // 表结构: {id, date, log, comment}
    const getDB = async () => {
        return openDB(`LogDB_${storeName}`, 1, {
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
        const index = tx.store.index('by_date'); // 使用日期索引
        const cursor = await index.openCursor(null, 'next'); // 从头开始，按日期升序
        return cursor ? cursor.value.date : null;
    };

    // 获取最新的日志日期
    const getLatestDate = async () => {
        const db = await getDB();
        const tx = db.transaction('logs', 'readonly');
        const index = tx.store.index('by_date'); // 使用日期索引
        const cursor = await index.openCursor(null, 'prev'); // 从末尾开始，按日期降序
        return cursor ? cursor.value.date : null;
    };

    // 模糊查询 log 字段
    const searchLogsByLog = async (keyword) => {
        const db = await getDB();
        const tx = db.transaction('logs', 'readonly');
        const store = tx.store;
        const logs = [];
        let cursor = await store.openCursor();

        if (!keyword) return logs;

        while (cursor) {
            const log = cursor.value;

            if (log.log && log.log.toLowerCase().includes(keyword.toLowerCase())) {
                logs.push(log);
            }

            cursor = await cursor.continue();
        }

        return logs.sort((a, b) => a.date - b.date);
    };

    // 模糊查询 comment 字段
    const searchLogsByComment = async (keyword) => {
        const db = await getDB();
        const tx = db.transaction('logs', 'readonly');
        const store = tx.store;
        const logs = [];
        let cursor = await store.openCursor();

        if (!keyword) return logs;

        while (cursor) {
            const log = cursor.value;
            if (log.comment && log.comment.toLowerCase().includes(keyword.toLowerCase())) {
                logs.push(log);
            }
            cursor = await cursor.continue();
        }

        return logs.sort((a, b) => a.date - b.date);
    };

    // 新增日志条目
    const addLog = async (logData) => {
        const db = await getDB();
        const tx = db.transaction('logs', 'readwrite');
        const store = tx.objectStore('logs');

        const newLog = {
            date: new Date(), // 默认使用当前时间
            log: '',
            comment: '',
            ...logData // 允许传入的对象覆盖默认值
        };

        const id = await store.add(newLog);
        await tx.done;
        return { id, ...newLog }; // 返回新添加的日志对象，包括自动生成的id
    };

    // 修改日志条目
    const updateLog = async (id, updatedData) => {
        const db = await getDB();
        const tx = db.transaction('logs', 'readwrite');
        const store = tx.objectStore('logs');

        // 先获取原有数据
        const existingLog = await store.get(id);
        if (!existingLog) {
            throw new Error(`Log with id ${id} not found`);
        }

        // 合并现有数据和新数据
        const updatedLog = {
            ...existingLog,
            ...updatedData,
            id // 确保id不被覆盖
        };

        await store.put(updatedLog);
        await tx.done;
        return updatedLog; // 返回更新后的日志对象
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

    // 删除日志条目
    const deleteLog = async (id) => {
        const db = await getDB();
        const tx = db.transaction('logs', 'readwrite');
        const store = tx.objectStore('logs');

        const existingLog = await store.get(id);
        if (!existingLog) {
            throw new Error(`Log with id ${id} not found`);
        }

        await store.delete(id);
        await tx.done;
        return true; // 表示删除成功
    };

    return {
        logsCache,
        getLogsCount,
        getLogsByDate,
        getOldestDate,
        getLatestDate,
        searchLogsByLog,
        searchLogsByComment,
        addLog,
        updateLog,
        deleteLog,
        generateTestData,
    };
});

export const useLogStore = useLogStoreFactory();