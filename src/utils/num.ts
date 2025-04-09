export function stringToNumber(str: string | number, defaultValue: number = 0): number {
    const num = Number(str);
    return isNaN(num)? defaultValue : num;
}