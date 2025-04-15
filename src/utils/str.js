import {showToast} from "vant";

export function removeEmptyLines(text) {
    return text.split('\n') // 按换行符拆分成数组
        .filter(line => line.trim() !== '') // 过滤掉空行
        .join('\n'); // 重新拼接为字符串
}

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('文本已成功复制到剪切板！');
    }).catch(err => {
        showToast('复制失败');
    });
}

export function downloadString(str, fileName) {
    // 创建 Blob 对象，指定类型为纯文本
    const blob = new Blob([str], { type: 'text/plain;charset=utf-8' });

    // 创建临时的 URL
    const url = window.URL.createObjectURL(blob);

    // 创建一个临时的 a 标签用于下载
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // 设置下载文件名

    // 将 a 标签添加到文档中并触发点击
    document.body.appendChild(link);
    link.click();

    // 清理：移除临时的 a 标签并释放 URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}