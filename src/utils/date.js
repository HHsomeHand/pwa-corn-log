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

export function convertToDate(year, month, day) {
    return dayjs(`${year}-${month}-${day}`).toDate();
}

export function stripTime(date) {
    if (!(date instanceof Date)) {
        throw new TypeError("Expected a Date object");
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
