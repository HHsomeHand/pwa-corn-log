import {showToast} from "vant";

export function removeEmptyLines(text: string) {
    return text.split('\n') // 按换行符拆分成数组
        .filter(line => line.trim() !== '') // 过滤掉空行
        .join('\n'); // 重新拼接为字符串
}

export function copyToClipboard(text: string, toastMsg = '文本已成功复制到剪切板！') {
    navigator.clipboard.writeText(text).then(() => {
        showToast(toastMsg);
    }).catch(err => {
        showToast('复制失败');
    });
}

export function downloadString(str: string, fileName: string) {
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

interface GetStringFromFileOptions {
    isPending?: boolean;
}

export function getStringFromFile(options?: GetStringFromFileOptions & {isPending?: true}): Promise<string>;

export function getStringFromFile(options?: GetStringFromFileOptions & {isPending: false}): Promise<string | null>;

export function getStringFromFile(options: GetStringFromFileOptions = {}) {
    const {
        isPending = false
    } = options;

    return new Promise<string | null>((resolve, reject) => {
        // 动态创建文件输入元素
        const fileInput = document.createElement('input');
        fileInput.type = 'file';

        // 将 input 添加到页面（可选）
        document.body.appendChild(fileInput);

        // 监听文件选择变化
        fileInput.addEventListener('change', function() {
            const file = this.files?.[0]; // 获取用户选择的文件

            if (file) {
                const reader = new FileReader();

                // 文件读取完成后显示内容
                reader.onload = function(event) {
                    const result = event.target?.result ?? null;

                    if (typeof result === 'string') {
                        resolve(result);
                    } else if (result === null){
                        if (!isPending) {
                            resolve(result);
                        }
                    } else {
                        const arrayBuffer = result;
                        const decoder = new TextDecoder('utf-8');
                        const str = decoder.decode(new Uint8Array(arrayBuffer));
                        resolve(str);
                    }
                };

                // 以文本形式读取文件
                reader.readAsText(file);

                fileInput.remove();
            } else {
                if (!isPending) {
                    resolve(null);
                }
            }
        });

        // 自动触发文件选择对话框（模拟点击）
        fileInput.click();
    });
}