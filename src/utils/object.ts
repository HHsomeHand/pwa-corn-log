export function findKeyByValue(
    object: Record<string, any>,
    value: any
): string | undefined {
    return Object.keys(object).find(key => object[key] === value);
}

export function pickFields<T, K extends keyof T>(obj: T, fields: K[]): Pick<T, K> {
    return fields.reduce((result, field) => {
        result[field] = obj[field];
        return result;
    }, {} as Pick<T, K>);
}

type StringBiMap<T extends Record<string, string>> = T & {
    [K in T[keyof T]]: { /* K 为值 */
        [P in keyof T]: T[P] extends K ? P : never /* P 为键 */
    }[keyof T] /* 联合类型中 never 会被自动剔除 */
}

export function createStringBiMap<T extends Record<string, string>>(obj: T): StringBiMap<T> {
    const result: any = {}

    for (const key in obj) {
        const value = obj[key]
        result[key] = value
        result[value] = key
    }

    return result
}
