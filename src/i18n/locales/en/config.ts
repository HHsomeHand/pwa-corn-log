import translationStaffList from "@/i18n/constants/translation-staff-list.ts";

export default {
    navBackText: "Back",
    navTitle: "Settings",
    mode: {
        cellGroupTitle: 'Mode',
        currMode: 'Current mode',
        currThemeColor: 'Current theme color'
    },
    lock: {
        cellGroupTitle: 'Privacy mode',
        enableStatus: 'Enable status',
        password: 'Password',
    },
    bg: {
        cellGroupTitle: 'Background image',
        currBgImage: 'Current background image',
        globalElBgColor: 'Global element background color',
        wallpaperBgColor: 'Wallpaper background color',
        commentBgColor: 'Comment background color'
    },
    modePlus: {
        cellGroupTitle: 'Mode · Advanced settings',
        addModeBtnText: 'Add mode',
        deleteModeBtnText: 'Delete mode',
        selectTemplateTip: 'Please select a template',
        modeName: 'Mode name',
        create: 'Create',
        createModeSuccessTip: 'Created successfully',
        createModeFailTip: 'Creation failed. Name conflict',
        noModeToRemoveTip: 'No custom modes to remove',
        removeSuccessTip: 'Deleted successfully',
        removeFailTip: 'Deletion failed',
    },
    bgBlur: {
        cellGroupTitle: 'Background image · Frosted glass effect (background color needs to be transparent) ',
        isEnable: 'Enable status',
        blurRadius: 'Blur radius',
    },
    bgPlus: {
        cellGroupTitle: 'Background image · Advanced settings',
        bgSize: 'Background image size',
        xPos: 'Background image X-axis position',
        yPos: 'Background image Y-axis position'
    },
    text: {
        textColorGroupTitle: 'Text color',
        textColor1: 'Text color 1',
        textColor2: 'Text color 2',
        textColor3: 'Text color 3',
        textStrokeGroupTitle: 'Text outline',
        textStrokeSize: 'Text outline size',
        textStrokeColor: 'Text outline color',
        textStrokeMultiple: 'Outline multiplier',
    },
    logStyle: {
        listStyleTitle: 'Log style · List',
        logEntryTitle: 'Log style · Log entry',
        entryGap: 'Entry spacing',
        dateGap: 'Date spacing',
        riseEntryHeight: 'Increase log entry height',
        alwaysShowComment: 'Always show comments',
        commentMiniHeight: 'Minimum comment height',
        timeFontSize: 'Time text size',
        dateMiniWidth: 'Minimum date width',
    },
    backup: {
        clean: {
            cleanGroupTitle: 'Data backup · Cleanup',
            cleanCurr: 'Clear current',
            cleanAll: 'Clear all',
            areYouSure: "Are you sure you want to delete? This operation is irreversible",
            confirm: 'Confirm',
            cleanSubmitText: 'Confirm to clear',
            pleaseInput: 'Please enter: Confirm',
            cancelTip: 'You have cancelled the operation',
        },
        export: {
            cellGroupTitle: 'Data backup · Export',
            exportCurr: 'Export current',
            exportAll: 'Export all',
            dialogTitle: "Data is ready",
            confirmButtonText: 'Finish',
            copyBtnText: "Copy to clipboard",
            exportFileBtnText: "Export as file",
        },
        import: {
            fromText: "From input",
            fromFile: "From file",
            inputLabel: "Import data",
            submitText: "Import",
            cellGroupTitle: "Data backup · Import",
            importCellText: "Import",
        },
    },
    about: {
        thankMsg: 'Thanks',
        detailTitle: 'Detailed information',
        version: 'Version number',
        qq: 'Author\'s QQ',
        redNote: 'Author\'s RedNote',
        about: 'About',
        copySuccessMsg: 'Copied successfully. Welcome to chat!',
        aboutMsg:  `
This software is completely open - source and free!

Thanks to those who have helped me, and thanks to everyone around me. Thank you for your company!

This project uses open - source projects such as Vue and Vant. Thanks to the project maintainers!

Thank you for using it!

Translation staff list:
${translationStaffList}
`
    },
    fontSize: {
        cellGroupTitle: 'Font settings · Pixel units',
        xsFontSize: 'Smallest fontsize',
        smFontSize: 'Small fontsize',
        mdFontSize: 'Medium fontsize',
        lgFontSize: 'Largest fontsize',
    },
    language: {
        cellGroupTitle: "Language",
        changeLanguageBtnText: "Switch language",
    }
}
