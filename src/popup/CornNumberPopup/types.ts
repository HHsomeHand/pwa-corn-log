import type {DialogOption} from "@/model/types.ts";

export interface NumberDialogOption extends DialogOption{
    minNum?: number,
    maxNum?: number,
    initNum: number,
    title: string
}

export interface NumberPopup {
    showPopup(options: NumberDialogOption): Promise<number | null>;
}

export type ShowPopupFunction = NumberPopup['showPopup'];