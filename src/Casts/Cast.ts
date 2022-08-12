import {Entity} from "../Entity";
import {GeneralObject} from "../GeneralTypes";

export class Cast {
    public static get(value: any, parameters: unknown): any {
        throw new Error(`Implement method get on ${this.constructor.name}`);
    }
    public static set(value: any, parameters: unknown): any {
        return value;
    }
}