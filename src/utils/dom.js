
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

/**
 * 倒序遍历一个ul的所有子元素, 直到遇到data-type="separator"的元素 停止, 这个元素不参与计算, 获取这些子元素的高度(包含margin)的总和
 * @param ul
 * @returns {number}
 */
export function getTotalHeightUntilSeparator(ul) {
    let children = Array.from(ul.children).reverse(); // 倒序遍历
    let totalHeight = 0;

    for (let child of children) {
        if (child.dataset.type === "separator") break; // 遇到分隔符停止

        let style = window.getComputedStyle(child);
        let height = child.getBoundingClientRect().height;
        let margin = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        totalHeight += height + margin;
    }

    return totalHeight;
}