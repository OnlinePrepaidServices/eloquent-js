export declare class Bag {
    protected items: any | object;
    constructor(items?: object);
    load(data: object): this;
    get<T>(key: string | number, fallback?: any): T | any;
    set<t>(key: string | number, value: any): this;
    each(callback: (key: string, value: any) => void): void;
    has(key: string): boolean;
    all(skipUndefined?: boolean): object;
    clone(): this;
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    create(key: string, initialValue?: any): this;
}
export declare function getBag(object: {
    [key: string]: any;
}, key: string): Bag | any;
