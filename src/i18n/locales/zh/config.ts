import translationStaffList from "@/i18n/constants/translation-staff-list.ts";

export default {
    navBackText: "返回",
    navTitle: "设置",
    setDefaultBtnText: "设为默认值",
    mode: {
        cellGroupTitle: '模式',
        currMode: '当前模式',
        currThemeColor: '当前主题色'
    },
    lock: {
        cellGroupTitle: '隐私模式',
        enableStatus: '启用状态',
        password: '密码',
    },
    bg: {
        cellGroupTitle: '背景图片',
        currBgImage: '当前背景图片',
        globalElBgColor: '全局元素背景色',
        wallpaperBgColor: '壁纸背景色',
        commentBgColor: '注释背景色'
    },
    modePlus: {
        cellGroupTitle: '模式 · 高级设置',
        addModeBtnText: '添加模式',
        deleteModeBtnText: '删除模式',
        selectTemplateTip: '请选择模板',
        modeName: '模式名',
        create: '创建',
        createModeSuccessTip: '创建成功',
        createModeFailTip: '创建失败, 命名冲突',
        noModeToRemoveTip: '没有可以移除的自定义模式',
        removeSuccessTip: '删除成功',
        removeFailTip: '删除失败',
    },
    bgBlur: {
        cellGroupTitle: '背景图片・毛玻璃特效 (背景色需透明) ',
        isEnable: '是否启用',
        blurRadius: '模糊半径',
    },
    bgPlus: {
        cellGroupTitle: '背景图片・高级设置',
        bgSize: '背景图片大小',
        xPos: '背景图片X轴位置',
        yPos: '背景图片Y轴位置'
    },
    text: {
        textColorGroupTitle: '文字颜色',
        textColor1: '文字颜色1',
        textColor2: '文字颜色2',
        textColor3: '文字颜色3',
        textStrokeGroupTitle: '文字包边',
        textStrokeSize: '包边大小',
        textStrokeColor: '文字包边颜色',
        textStrokeMultiple: '包边乘积',
    },
    logStyle: {
        listStyleTitle: '日志样式 · 列表',
        logEntryTitle: '日志样式 · 日志条目',
        entryGap: '条目的间距',
        dateGap: '日期的间距',
        riseEntryHeight: '日志条目增高',
        alwaysShowComment: '恒显示备注',
        commentMiniHeight: '备注的最小高度',
        timeFontSize: '时间文字大小',
        timeWidth: '时间宽度',
        timeHeight: '时间高度',
        dateMiniWidth: '日期最小宽度',
    },
    backup: {
        clean: {
            cleanGroupTitle: '数据备份 · 清理',
            cleanCurr: '清空当前',
            cleanAll: '清空所有',
            areYouSure: "您是否确认删除? 此操作不可逆",
            confirm: '确认',
            cleanSubmitText: '确认清空',
            pleaseInput: '请输入: 确认',
            cancelTip: '您已取消操作',
        },
        export: {
            cellGroupTitle: '数据备份 · 导出',
            exportCurr: '导出当前',
            exportAll: '导出全部',
            dialogTitle: "已经准备好了数据",
            confirmButtonText: '结束',
            copyBtnText: "复制到剪切板",
            exportFileBtnText: "导出为文件",
        },
        import: {
            fromText: "从输入",
            fromFile: "从文件",
            inputLabel: "导入数据",
            submitText: "导入",
            cellGroupTitle: "数据备份 · 导入",
            importCellText: "导入",
        },
    },
    about: {
        thankMsg: '鸣谢',
        detailTitle: '详细信息',
        version: '版本号',
        qq: '作者QQ',
        redNote: '作者小红书',
        about: '关于',
        copySuccessMsg: '成功复制, 欢迎来聊天!',
        copyTip: '点击复制',
        aboutMsg:  `
本软件为完全开源且免费!

感谢曾经帮助过我的人, 也感谢我身边的所有人, 谢谢你们的陪伴!

本项目使用了 Vue 和 Vant 等开源项目, 感谢项目的维护者!

也感谢你的使用!

翻译人员名单:

${translationStaffList}
`
    },
    fontSize: {
        cellGroupTitle: '字体设置 · 像素单位',
        xsFontSize: '最小字体',
        smFontSize: '小字体',
        mdFontSize: '中号字体',
        lgFontSize: '最大字体',
    },
    language: {
        cellGroupTitle: "语言",
        changeLanguageBtnText: "切换语言",
    }
}
