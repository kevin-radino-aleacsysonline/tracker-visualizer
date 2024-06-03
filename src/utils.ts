export function wait(ms: number): Promise<void> {
    return new Promise<void>((res) => {
        setTimeout(() => {
            res();
        }, ms);
    });
}

export function isValidURL(url: string): boolean {
    const regex: RegExp = /^(https?:\/\/)?([\w-]+\.)*[\w-]+(:\d+)?(\/\S*)?$/;
    return regex.test(url);
}
