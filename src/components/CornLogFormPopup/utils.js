import CornLogFormPopup from "@/components/CornLogFormPopup/CornLogFormPopup.vue";
import {useGlobalCpn} from "@/hooks/globalCpn.hook.js";



// 用户提交了 resolve {log, comment}
// 用户关闭了, 就 resolve null
export const showLogFormPopup = useGlobalCpn(CornLogFormPopup, {
    showMethod: "showPopup"
});