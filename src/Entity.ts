import axios from "axios";
import {AttributeBag} from "./Bag/AttributeBag";
import {Bag} from "./Bag/Bag";
import {RelationBag} from "./Bag/RelationBag";
import {Configuration} from "./Configuration";
import {Url} from "./Support/Url";
import {Collection} from 'collect.js';
import {Converter} from "./Support/Converter";
import {GetRouteBuilder} from "./Builder/GetRouteBuilder";
import {FindRouteBuilder} from "./Builder/FindRouteBuilder";
import {Cast} from "./Casts/Cast";

/**
 * @todo Generate setters and getter automatically Regex: (get\s+([a-z]+)\(\)[\s]*\{\s*return\s+this.get\(["'][a-zA-Z]+["']\)[;][\s]*})
 */
export class Entity {
    protected attributesBag: AttributeBag;
    protected originalBag: AttributeBag;
    protected relationsBag: RelationBag = new RelationBag();
    protected static routesBag: Bag;
    protected static routesInitiated: boolean = false;
    protected castsBag: Bag = new Bag();

    constructor(attributes: object = {}) {
        this.attributesBag = new AttributeBag();
        this.attributes(this.attributesBag);
        this.attributesBag.load(attributes);
        this.relations(this.relationsBag);
        this.buildRelations(attributes);

        this.casts(this.castsBag);

        (this.constructor as typeof Entity).initiateRoutes();

        this.originalBag = this.attributesBag.clone();
    }

    protected static initiateRoutes(): void {
        if (this.routesInitiated) {
            return;
        }

        this.routesBag = new Bag(Configuration.get('routes'))
        this.routes(this.routesBag);
        this.routesInitiated = true;
    }

    protected buildRelations(attributes: { [key: string]: any }) {
        const lowerCamelCaseAttributes = Converter.objectKeysToLowerCamelCase(attributes);
        this.relationsBag.eachType((key, value) => {
            if (lowerCamelCaseAttributes[key]) {
                this.relationsBag.createRelation(key, lowerCamelCaseAttributes[key]);
            }
        })
    }

    protected static routes(routes: Bag): void {
    }

    protected attributes(attributes: AttributeBag): void {
        throw `The "attributes()" method on ${this.constructor.name} should be extended`;
    }

    protected relations(relations: Bag) {
    }

    protected casts(casts: Bag): void {
    }

    protected static baseRoute(): string {
        throw `The "baseRoute()" method on ${this.constructor.name} should be extended`;
    }

    protected static create<T extends typeof Entity>(this: T, data: object): InstanceType<T> {
        return new this({...data}) as InstanceType<T>;
    }

    public static $get<T extends typeof Entity>(
        this: T,
        routeBuilderCallback: ((routeBuilder: GetRouteBuilder) => void) | null = null
    ): Promise<Collection<InstanceType<T>>> {
        this.initiateRoutes();

        const getRouteBuilder = new GetRouteBuilder();
        if (routeBuilderCallback) {
            routeBuilderCallback(getRouteBuilder);
        }

        let url: string = Url.replaceUrlParameters(`${Configuration.get('url').base}${this.baseRoute()}${this.routesBag.get('get').route}`, getRouteBuilder.getRouteParameters());
        return axios.get(url).then((response) => {
            let entities = new Collection<InstanceType<T>>();

            response.data.data.forEach((value: object) => {
                entities.push(this.create(value) as InstanceType<T>);
            })

            return entities
        });
    }

    public static $find<T extends typeof Entity>(
        this: T,
        uuid: string,
        routeBuilderCallback: ((routeBuilder: GetRouteBuilder) => void) | null = null
    ): Promise<InstanceType<T>> {
        this.initiateRoutes();

        const findRouteBuilder = new FindRouteBuilder();
        findRouteBuilder.routeParameter('key', uuid);
        if (routeBuilderCallback) {
            routeBuilderCallback(findRouteBuilder);
        }

        let url: string = Url.replaceUrlParameters(`${Configuration.get('url').base}${this.baseRoute()}${this.routesBag.get('find').route}`, findRouteBuilder.getRouteParameters());

        return axios.get(url).then((response) => {
            return this.create(response.data.data);
        });
    }

    public get(key: string, fallback: any = null): any {
        if (this.attributesBag.has(key)) {
            if (this.castsBag.has(key)) {
                return this.castsBag.get<Cast>(key).get(this.attributesBag.get(key));
            }

            return this.attributesBag.get(key);
        }

        if (this.relationsBag.has(key)) {
            return this.relationsBag.get(key);
        }

        return fallback;
    }

    public set(key: string, value: any): void {
        if (this.attributesBag.has(key)) {
            if (this.castsBag.has(key)) {
                this.attributesBag.set(key, this.castsBag.get<Cast>(key).get(key));

                return;
            }

            this.attributesBag.set(key, value);

            return;
        }

        if (this.relationsBag.has(key)) {
            this.relationsBag.set(key, value);

            return;
        }

        throw `The class ${this.constructor.name} does not have a property "${key}"`;
    }

    public toObject(skipUndefined: boolean = false): { [key: string]: any } {
        return Converter.objectKeysToSnakeCase(this.attributesBag.all());

    }
}