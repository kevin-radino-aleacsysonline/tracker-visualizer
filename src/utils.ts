export function wait(ms: number): Promise<void> {
    return new Promise<void>((res) => {
        setTimeout(() => {
            res();
        }, ms);
    });
}

export function stringToEnum<T extends string>(str: string, enumType: T): T | undefined {
    return Object.values(enumType).includes(str as T) ? (str as T) : undefined;
}

export function isValidURL(url: string): boolean {
    const regex: RegExp = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}
