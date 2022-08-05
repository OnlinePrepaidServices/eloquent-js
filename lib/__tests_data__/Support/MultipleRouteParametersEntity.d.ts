import { Entity } from "../../Entity";
import { AttributeBag } from "../../Bag/AttributeBag";
/**
 * @class Entity
 */
export declare class MultipleRouteParametersEntity extends Entity {
    protected static baseRoute(): string;
    protected attributes<T>(attributes: AttributeBag): void;
    get uuid(): string;
    set uuid(value: string);
    get firstName(): any;
    set firstName(value: any);
    get lastName(): string;
    set lastName(value: string);
    get email(): any;
    set email(value: any);
}
