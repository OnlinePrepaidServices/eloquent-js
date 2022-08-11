import {Entity} from "../Entity";
import {GeneralObject} from "../GeneralTypes";

export class Cast {
    public static get(value: any, entity: Entity, parameters: GeneralObject): any {
        throw new Error(`Implement method get on ${this.constructor.name}`);
    }
    public static set(value: any, entity: Entity, parameters: GeneralObject): void {
        throw new Error(`Implement method set on ${this.constructor.name}`);
    }
}