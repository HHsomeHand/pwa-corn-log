export interface DialogOption {
    submitText?: string,
}

export interface CallbackOption {
    callbackFn?: Function,
}

export type HookResolveTuple = [isSubmitted: boolean, data: unknown];