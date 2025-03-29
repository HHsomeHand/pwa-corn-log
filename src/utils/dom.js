
export function canScroll(el) {
    return el.scrollHeight > el.clientHeight;
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