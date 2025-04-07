export interface DialogOption {
    submitText?: string,
}

export interface CallbackOption {
    callbackFn?: Function,
}

export interface Dialog<OptionType extends DialogOption = DialogOption> {
    (options: OptionType): Promise<unknown>;
}