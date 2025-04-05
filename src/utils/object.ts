export function findKeyByValue(
    object: Record<string, any>,
    value: any
): string | undefined {
    return Object.keys(object).find(key => object[key] === value);
}