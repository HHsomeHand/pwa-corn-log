export interface LogEntry {
    comment: string; // 备注
    date: Date; // 日期
    id: number; // id, 用于更新 indexDB
    log: string; // 日志内容 (药名)
}
