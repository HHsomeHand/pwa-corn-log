import {useGlobalCpn} from "@/hooks/globalCpn.hook.ts";
import CornActionSheet from "@/components/CornActionSheet/CornActionSheet.vue";

// 就显示一个 action sheet, 具体参数的使用, 请查看 vant 文档, 或是直接查看用法
// 这个函数虽然返回 promise, 但是其实就算状态为 full 也不会返回任何值
export const showActionSheet = useGlobalCpn(CornActionSheet, {
    showMethod: "showActionSheet"
});

// resolve 选中的参数值
// 如果用户不选择就无限 Pending
export function showActionSheetByArray(array: string[]) {
    return new Promise(resolve => {
        let actions = array.map(el => {
            return {
                name: el,
                callback(item: string) {
                    resolve(el);
                },
            } // END OF RETURN
        });

        showActionSheet(actions)
    })
}

// [{showText: '选项title', value: ''}] 返回 value
// resolve 选中的参数值
// 如果用户不选择就无限 Pending
export function showActionSheetByArrayEx(array: {showText: string, value: any}[]) {
    return new Promise(resolve => {
        let actions = array.map(el => {
            return {
                name: el.showText,
                callback(item: string) {
                    resolve(el.value);
                },
            } // END OF RETURN
        });

        showActionSheet(actions)
    })
}