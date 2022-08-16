import Enum from "./Enum";

export class EventKey extends Enum {
    static RETRIEVED: number = 1;
    static CREATING: number = 2;
    static CREATED: number = 3;
    static UPDATING: number = 4;
    static UPDATED: number = 5;
    static SAVING: number = 6;
    static SAVED: number = 7;
    static DELETING: number = 8;
    static DELETED: number = 9;

    public prefixKey(modelName: string = '*') {
        return `entity.${this.key.toLowerCase()}.${modelName.toLowerCase()}`;
    }
}