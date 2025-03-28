import dayjs from "dayjs";

export function fmtDate(date, fmt = "YYYY-MM-DD") {
    return dayjs(date).format(fmt);
}

export const getDomElement = (refValue) => {
    return refValue instanceof HTMLElement ? refValue : refValue?.$el;
};

export function vh2px(vh) {
    // 获取视口高度
    const viewportHeight = window.innerHeight;

    const px = (vh / 100) * viewportHeight;

    return px;
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

export * from './store.js'