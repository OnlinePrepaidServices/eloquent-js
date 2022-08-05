import { Bag } from "./Bag";
export declare class RelationBag extends Bag {
    protected types: {
        [key: string]: any;
    };
    constructor();
    create<T>(key: string, relation: any): this;
    hasType(relation: string): boolean;
    eachType(callback: (key: string, value: any) => void): void;
    createRelation(relation: string, attributes: {}): null | undefined;
}
