import type {DialogOption} from "@/model/types.ts";

export interface NumberDialogOption extends DialogOption{
    minNum?: number | null,
    maxNum?: number | null,
    initNum?: number,
}