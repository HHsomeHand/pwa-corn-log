export function removeEmptyLines(text) {
    return text.split('\n') // 按换行符拆分成数组
        .filter(line => line.trim() !== '') // 过滤掉空行
        .join('\n'); // 重新拼接为字符串
}

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('文本已成功复制到剪切板！');
    }).catch(err => {
        console.error('复制失败:', err);
    });
}
