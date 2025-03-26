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