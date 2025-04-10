import dayjs from "dayjs";

export function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // 设置为明天的日期
    return tomorrow;
}

export function fmtDate(date, fmt = "YYYY-MM-DD") {
    return dayjs(date).format(fmt);
}

export function getDateInfo(date = new Date()) {
    const d = dayjs(date);
    return {
        year: d.year(),
        month: d.month() + 1,
        date: d.date()
    };
}

export function getTimeInfo(date = new Date()) {
    const d = dayjs(date);
    return {
        hour: d.hour(),
        min: d.minute(),
        sec: d.second()
    };
}

export function convertToDate(year, month, day) {
    return dayjs(`${year}-${month}-${day}`).toDate();
}

export function convertToTime(hour, min, sec) {
    return dayjs().hour(hour).minute(min).second(sec).toDate();
}

// 克隆date, 只保留年月日, 去除时分秒
export function stripTime(date) {
    if (!(date instanceof Date)) {
        throw new TypeError("Expected a Date object");
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(d1, d2) {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

export function isSameDate(date1, date2) {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
        throw new Error("必须为 Date 对象");
    }
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate() &&
        date1.getHours() === date2.getHours() &&
        date1.getMinutes() === date2.getMinutes() &&
        date1.getSeconds() === date2.getSeconds();
}
export function isInvalidDate(date) {
    return isNaN(date.getTime());
}