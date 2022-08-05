export class Cast {
    public static get(value: any): any {
        throw `Implement method get on ${this.constructor.name}`;
    }
    public static set(value: any): void {
        throw `Implement method set on ${this.constructor.name}`;
    }
}