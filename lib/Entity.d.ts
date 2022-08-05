import { AttributeBag } from "./Bag/AttributeBag";
import { Bag } from "./Bag/Bag";
import { RelationBag } from "./Bag/RelationBag";
import { Collection } from 'collect.js';
import { GetRouteBuilder } from "./Builder/GetRouteBuilder";
/**
 * @todo Generate setters and getter automatically Regex: (get\s+([a-z]+)\(\)[\s]*\{\s*return\s+this.get\(["'][a-zA-Z]+["']\)[;][\s]*})
 */
export declare class Entity {
    protected attributesBag: AttributeBag;
    protected originalBag: AttributeBag;
    protected relationsBag: RelationBag;
    protected static routesBag: Bag;
    protected static routesInitiated: boolean;
    protected castsBag: Bag;
    constructor(attributes?: object);
    protected static initiateRoutes(): void;
    protected buildRelations(attributes: {
        [key: string]: any;
    }): void;
    protected static routes(routes: Bag): void;
    protected attributes(attributes: AttributeBag): void;
    protected relations(relations: Bag): void;
    protected casts(casts: Bag): void;
    protected static baseRoute(): string;
    protected static create<T extends typeof Entity>(this: T, data: object): InstanceType<T>;
    static $get<T extends typeof Entity>(this: T, routeBuilderCallback?: ((routeBuilder: GetRouteBuilder) => void) | null): Promise<Collection<InstanceType<T>>>;
    static $find<T extends typeof Entity>(this: T, uuid: string, routeBuilderCallback?: ((routeBuilder: GetRouteBuilder) => void) | null): Promise<InstanceType<T>>;
    get(key: string, fallback?: any): any;
    set(key: string, value: any): void;
    toObject(skipUndefined?: boolean): {
        [key: string]: any;
    };
}
