export default class Enum {
    readonly value: any;
    readonly key: string;

    constructor(value: any) {
        this.value = value;
        this.key = (this.constructor as typeof Enum).retrieveKey(this.value);
    }

    static from<T extends typeof Enum>(this: T, value: any): InstanceType<T> {
        return new this(value) as InstanceType<T>;
    }

    static fromKey<T extends typeof Enum>(name: string): InstanceType<T> {
        // @ts-ignore
        return new this(this[name]) as InstanceType<T>;
    }

    public static retrieveKey(value: any): string {
        let key: string = '';

        Object.entries(this).forEach((entry) => {
            if (entry[1] === value) {
                key = entry[0] as string;
            }
        });

        return key;
    }

    is(enumObject: Enum) {
        return this.value === enumObject.value;
    }

    toString() {
        return this.key;
    }
}
