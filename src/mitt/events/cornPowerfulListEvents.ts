import type {LogEntry} from "@/model/logs.type.ts";

export type PowerfulListEvents = {
    'list:update': LogEntry; // updatedData
    'list:delete': LogEntry; // 删除的数据
    "list:add": LogEntry;
};