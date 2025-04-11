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