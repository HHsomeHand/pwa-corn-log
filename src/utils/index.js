import dayjs from "dayjs";

export function fmtDate(date, fmt = "YYYY-MM-DD") {
    return dayjs(date).format(fmt);
}

export const getDomElement = (refValue) => {
    return refValue instanceof HTMLElement ? refValue : refValue?.$el;
};