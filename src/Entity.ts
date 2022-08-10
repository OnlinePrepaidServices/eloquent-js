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
import {RouteParameterRouteBuilder} from "./Builder/RouteParameterRouteBuilder";

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
    protected isDirty: boolean = false;
    protected isInitialized: boolean = false;
    protected fetchedFromServer: boolean;
    protected primaryKey = 'uuid';

    constructor(attributes: object = {}, fetchedFromServer: boolean = false) {
        this.attributesBag = new AttributeBag();
        this.attributes(this.attributesBag);
        this.attributesBag.load(attributes);
        this.relations(this.relationsBag);
        this.buildRelations(attributes);
        this.casts(this.castsBag);

        (this.constructor as typeof Entity).initiateRoutes();
        this.originalBag = this.attributesBag.clone();
        this.isInitialized = true;
        this.fetchedFromServer = fetchedFromServer;
    }

    public static $get<T extends typeof Entity>(
        this: T,
        routeBuilderCallback: ((routeBuilder: GetRouteBuilder) => void) | null = null
    ): Promise<Collection<InstanceType<T>>> {
        this.initiateRoutes();

        const getRouteBuilder = new GetRouteBuilder();
        const url: string = this.buildRoute(getRouteBuilder, routeBuilderCallback, 'get');

        return axios.get(url).then((response) => {
            let entities = new Collection<InstanceType<T>>();

            response.data.data.forEach((value: object) => {
                entities.push(this.create(value, true) as InstanceType<T>);
            });

            return entities
        });
    }

    public static $find<T extends typeof Entity>(
        this: T,
        uuid: string,
        routeBuilderCallback: ((routeBuilder: FindRouteBuilder) => void) | null = null
    ): Promise<InstanceType<T>> {
        this.initiateRoutes();

        const findRouteBuilder = new FindRouteBuilder();
        findRouteBuilder.routeParameter('key', uuid);
        const url: string = this.buildRoute(findRouteBuilder, routeBuilderCallback, 'find');

        return axios.get(url).then((response) => {
            return this.create(response.data.data, true);
        });
    }

    public $create(routeBuilderCallback: ((routeBuilder: RouteParameterRouteBuilder) => void) | null = null): Promise<Entity | this> {
        const createRouteBuilder = new RouteParameterRouteBuilder();
        const url: string = (this.constructor as typeof Entity).buildRoute(createRouteBuilder, routeBuilderCallback, 'create');

        return axios
            .post(
                url,
                Converter.objectKeysToSnakeCase(this.attributesBag.all())
            )
            .then((response) => {
                return (this.constructor as typeof Entity).create(response.data.data, true);
            });
    }

    public $update(routeBuilderCallback: ((routeBuilder: RouteParameterRouteBuilder) => void) | null = null, key: string = this.primaryKey): Promise<Entity | this> {
        const updateRouteBuilder = new RouteParameterRouteBuilder();
        updateRouteBuilder.routeParameter('key', this.attributesBag.get(key));
        const url: string = (this.constructor as typeof Entity).buildRoute(updateRouteBuilder, routeBuilderCallback, 'update');

        return axios
            .put(
                url,
                Converter.objectKeysToSnakeCase(this.attributesBag.all())
            )
            .then((response) => {
                return (this.constructor as typeof Entity).create(response.data.data, true);
            })
    }

    public $patch(routeBuilderCallback: ((routeBuilder: RouteParameterRouteBuilder) => void) | null = null, key: string = this.primaryKey): Promise<Entity | this> {
        if (!this.isDirty) {
            return new Promise((resolve) => {
                resolve(this);
            });
        }

        const patchRouteBuilder = new RouteParameterRouteBuilder();
        patchRouteBuilder.routeParameter('key', this.attributesBag.get(key));
        const url: string = (this.constructor as typeof Entity).buildRoute(patchRouteBuilder, routeBuilderCallback, 'update');

        return axios
            .put(
                url,
                Converter.objectKeysToSnakeCase(this.originalBag.diff(this.attributesBag))
            )
            .then((response) => {
                return (this.constructor as typeof Entity).create(response.data.data, true);
            })
    }

    public $delete(routeBuilderCallback: ((routeBuilder: RouteParameterRouteBuilder) => void) | null = null, key: string = this.primaryKey): Promise<Entity | this> {
        const deleteRouteBuilder = new RouteParameterRouteBuilder();
        deleteRouteBuilder.routeParameter('key', this.attributesBag.get(key));
        const url: string = (this.constructor as typeof Entity).buildRoute(deleteRouteBuilder, routeBuilderCallback, 'update');

        return axios
            .delete(url)
            .then((response) => {
                return (this.constructor as typeof Entity).create(response.data.data, true);
            })
    }

    // @todo add correct typings
    protected static buildRoute(routeBuilder: any, routeBuilderCallback: any, routeKey: string): string {
        if (typeof routeBuilderCallback === "function") {
            routeBuilderCallback(routeBuilder);
        }

        let url = Url.replaceUrlParameters(`${Configuration.get('url').base}${this.baseRoute()}${this.routesBag.get(routeKey).route}`, routeBuilder.getRouteParameters());
        let searchParameters = routeBuilder.handle();

        if (!searchParameters) {
            return url;
        }

        return `${url}?${searchParameters}`
    }

    protected static initiateRoutes(): void {
        if (this.routesInitiated) {
            return;
        }

        this.routesBag = new Bag(Configuration.get('routes'))
        this.routes(this.routesBag);
        this.routesInitiated = true;
    }

    protected static baseRoute(): string {
        throw `The "baseRoute()" method on ${this.constructor.name} should be extended`;
    }

    protected static create<T extends typeof Entity>(this: T, data: object, fetchedFromServer: boolean = false): InstanceType<T> {
        return new this({...data}, fetchedFromServer) as InstanceType<T>;
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

    protected relations(relations: RelationBag) {
    }

    protected casts(casts: Bag): void {
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
            if (!this.isDirty && this.isInitialized && !this.attributesBag.isEqualTo(key, value)) {
                this.isDirty = true;
            }

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