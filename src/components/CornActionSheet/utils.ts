import {useGlobalCpn} from "@/hooks/globalCpn.hook.js";
import CornActionSheet from "@/components/CornActionSheet/CornActionSheet.vue";

// 就显示一个 action sheet, 具体参数的使用, 请查看 vant 文档, 或是直接查看用法
// 这个函数虽然返回 promise, 但是其实就算状态为 full 也不会返回任何值
export const showActionSheet = useGlobalCpn(CornActionSheet, {
    showMethod: "showActionSheet"
});

// resolve 选中的参数值
// 如果用户不选择就无限 Pending
export function showActionSheetByArray(array) {
    return new Promise(resolve => {
        let actions = array.map(el => {
            return {
                name: el,
                callback(item) {
                    resolve(el);
                },
            } // END OF RETURN
        });

        showActionSheet(actions)
    })
}