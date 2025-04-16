<script setup lang="ts">

import {copyToClipboard} from "@/utils";
import {showDialog} from "vant";

const qq = ref("2402398917");

const redNoteId = ref("3012103640");

const isShowDialog = ref(false);

// TODO: 等翻译人员多了以后, 抽取为单独的 markdown (.md) 文件, 且弄一个 AboutView.vue
const aboutMsg = `
本软件为完全开源且免费!

感谢曾经帮助过我的人, 也感谢我身边的所有人, 谢谢你们的陪伴!

本项目使用了 Vue 和 Vant 等开源项目, 感谢项目的维护者!

也感谢你的使用!

翻译人员名单:

中文: 溯水流光 (2402398917)

英文: 溯水流光 (2402398917)
`;

function showAboutDialog() {
  showDialog({
    title: '鸣谢',
    message: aboutMsg,
    messageAlign: "left"
  })
}
</script>

<template>
  <van-cell-group title="详细信息">
    <van-cell
        title="版本号"
        value="1.0.0"
    />

    <van-cell
        title="作者QQ"
        :value="qq"
        @click="copyToClipboard(qq, '成功复制, 欢迎来聊天!')"
        clickable
    />

    <van-cell
        title="作者小红书"
        :value="redNoteId"
        @click="copyToClipboard(redNoteId, '成功复制, 欢迎来聊天!')"
        clickable
    />

    <van-cell
        title="关于"
        clickable
        is-link
        @click="showAboutDialog"
    />
  </van-cell-group>

  <teleport to="body">
    <van-dialog v-model:show="isShowDialog" title="鸣谢">
      感谢曾经帮助过我的人, 也感谢我身边的所有人, 谢谢你们的陪伴! <br/>
      本项目使用了 Vue 和 Vant 等开源项目, 感谢项目的维护者! <br/>
      也感谢你的使用!


    </van-dialog>
  </teleport>
</template>

<style scoped>

</style>
