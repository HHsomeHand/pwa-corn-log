// 写一个js hook, 这个hook函数的参数是一个async函数,
// 使用这个hook, 可以保证, 同一时间, 目标函数只会被调用一次,
// 多次调用要排队等待, 其实就是加锁, 防止await的时候发生切换, 导致结果不可控
export function useQueueAsync(fn) {
    // 存储等待中的 Promise
    let queue = [];
    // 表示当前是否正在执行
    let isRunning = false;

    // 核心执行函数
    async function execute(...args) {
        // 如果正在执行，将新的调用加入队列
        if (isRunning) {
            return new Promise((resolve, reject) => {
                queue.push({ resolve, reject, args });
            });
        }

        // 设置运行状态
        isRunning = true;

        try {
            // 执行目标异步函数
            const result = await fn(...args);

            // 执行完成后，处理队列中的下一个任务
            isRunning = false;
            processQueue();

            return result;
        } catch (error) {
            // 错误处理
            isRunning = false;
            processQueue();
            throw error;
        }
    }

    // 处理队列中的下一个任务
    function processQueue() {
        if (queue.length === 0) return;

        const next = queue.shift();
        execute(...next.args)
            .then(next.resolve)
            .catch(next.reject);
    }

    // 返回包装后的函数
    return execute;
}