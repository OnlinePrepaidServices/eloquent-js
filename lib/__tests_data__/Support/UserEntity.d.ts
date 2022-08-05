import { Entity } from "../../Entity";
import { AttributeBag } from "../../Bag/AttributeBag";
import { RelationBag } from "../../Bag/RelationBag";
import { Bag } from "../../Bag/Bag";
/**
 * @class Entity
 */
export declare class User extends Entity {
    protected static baseRoute(): string;
    protected attributes(attributes: AttributeBag): void;
    protected relations(relations: RelationBag): void;
    protected casts(casts: Bag): void;
    get uuid(): string;
    set uuid(value: string);
    get firstName(): any;
    set firstName(value: any);
    get lastName(): string;
    set lastName(value: string);
    get email(): any;
    set email(value: any);
    get createdBy(): any;
    set createdBy(value: any);
    get createdAt(): any;
    set createdAt(value: any);
}
