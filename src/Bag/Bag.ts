import {GeneralObject} from "../GeneralTypes";

export class Bag {
    protected items: any | object = {};

    constructor(items: object = {}) {
        this.items = items;
    }

    public load(data: GeneralObject): this {
        this.items = data;

        return this;
    }

    public loadStrict(data: GeneralObject): this {
        Object.keys(data).forEach((key) => {
            if (!this.has(key)) {
                return;
            }

            this.set(key, data[key]);
        })

        return this;
    }

    public get<T>(key: string | number, fallback?: any): T | any {
        if (this.items.hasOwnProperty(key)) {
            return this.items[key];
        }

        return fallback;
    }

    public set<t>(key: string | number, value: any) {
        this.items[key] = value;

        return this;
    }

    public each(callback: (key: string, value: any) => void) {
        Object.keys(this.items).forEach((key) => {
            callback(key, this.items[key]);
        })
    }

    public has(key: string): boolean {
        return this.items.hasOwnProperty(key);
    }

    public all(skipUndefined: boolean = false): object {
        const result: { [key: string]: any } = {...this.items};

        if (skipUndefined) {
            Object.keys(result).forEach((keys: string) => {
                if (typeof result[keys] === 'undefined') {
                    delete result[keys];
                }
            })
        }

        return result
    }

    public clone(): this {
        return new (this.constructor as new (items: object) => this)({...this.items})
    }

    public isEmpty(): boolean {
        return Object.keys(this.items).length === 0;
    }

    public isNotEmpty(): boolean {
        return !this.isEmpty();
    }

    public create(key: string, initialValue?: any) {
        if (this.has(key)) {
            return this;
        }

        this.items[key] = initialValue;

        return this;
    }

    public isEqualTo(key: string, value: any): boolean {
        return this.get(key) === value;
    }

    public diff(bag: Bag): { [key: string]: any } {
        const attributes: { [key: string]: any } = {...bag.all()};

        Object.keys(attributes).forEach((key) => {
            if (this.get(key) === attributes[key]) {
                delete attributes[key];
            }
        });

        return attributes;
    }
}

export function getBag(object: { [key: string]: any }, key: string): Bag | any {
    return object[key];
}