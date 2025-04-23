// 用于存储数据
export interface LogEntry {
    comment: string; // 备注
    date: Date; // 日期
    id: number; // id, 用于更新 indexDB
    log: string; // 日志内容 (药名)
}

// 给 CornPowerfulList 展示数据用的
export type ListLogEntry = LogEntry & {
    type?: "end"
}