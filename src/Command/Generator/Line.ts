export class Line {
    line: string;
    key: number | undefined;
    originalKey: number;
    removed: boolean = false;

    constructor(key: number, line: string) {
        this.key = key;
        this.originalKey = key;
        this.line = line;
    }

    isEmpty() {
        return (this.line as unknown as string).replace(/\s/g, '').length === 0;
    }

    is(key: number): boolean {
        if (this.key !== undefined && this.key === key) {
            return true;
        }

        return false;
    }

    isOriginal(key: number): boolean {
        if (this.key !== undefined && this.originalKey === key) {
            return true;
        }

        return false;
    }

    gte(key: number) {
        if (this.key !== undefined && this.key >= key) {
            return true;
        }
    }

    decreaseKey(): void {
        if (this.key === undefined) {
            return;
        }

        this.key--;
    }

    increaseKey(): void {
        if (this.key === undefined) {
            return;
        }

        this.key++;
    }

    toString(): string {
        return this.line;
    }

    remove(): void {
        this.removed = true;
        this.key = undefined;
    }
}