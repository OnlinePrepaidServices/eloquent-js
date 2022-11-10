import axios from "axios";
import {AttributeBag} from "./Bag/AttributeBag";
import {Bag} from "./Bag/Bag";
import {RelationBag} from "./Bag/RelationBag";
import {Configuration} from "./Configuration";
import {Url} from "./Support/Url";
import {Converter} from "./Support/Converter";
import {GetRouteBuilder} from "./Builder/GetRouteBuilder";
import {FindRouteBuilder} from "./Builder/FindRouteBuilder";
import {RouteParameterRouteBuilder} from "./Builder/RouteParameterRouteBuilder";
import {GeneralObject} from "./GeneralTypes";
import {CastsBag} from "./Bag/CastsBag";
import {EE} from "./Support/Event/EE";
import {EntityEvent} from "./Eventing/Events/EntityEvent";
import {EventKey} from "./Enum/EventKey";
import {Collection} from "collect.js";
import {EntityInterface} from "./EntityInterface";
import {EntityCollectionResponse} from "./Response/EntitiyCollectionResponse";
import {SingleEntityResponse} from "./Response/SingleEntityResponse";
import {FindWrappedRouteBuilder} from "./Builder/FindWrappedRouteBuilder";

export class Entity implements EntityInterface {
    protected attributesBag: AttributeBag;
    protected originalBag: AttributeBag;
    protected relationsBag: RelationBag = new RelationBag();
    protected static routesBag: Bag;
    protected static routesInitiated: boolean = false;
    protected castsBag: CastsBag = new CastsBag();
    protected isEntityDirty: boolean = false;
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

    public static $get<T extends EntityCollectionResponse<any>>(
        routeBuilderCallback: ((routeBuilder: GetRouteBuilder) => void) | null = null
    ): Promise<T> {
        this.initiateRoutes();

        const getRouteBuilder = new GetRouteBuilder();
        const url: string = this.buildRoute(getRouteBuilder, routeBuilderCallback, 'get');

        return axios.get(url).then((response) => {
            if (typeof getRouteBuilder.responseClass === 'undefined') {
                return EntityCollectionResponse.fromResponse(response, this) as T;
            }

            return getRouteBuilder.responseClass.fromResponse(response, this) as T;
        });
    }

    protected static find(
        uuid: string,
        routeBuilderCallback: ((routeBuilder: FindRouteBuilder | FindWrappedRouteBuilder) => void) | null = null,
        routeBuilder: FindRouteBuilder | FindWrappedRouteBuilder
    ): Promise<any> {
        this.initiateRoutes();

        routeBuilder.routeParameter('key', uuid);
        const url: string = this.buildRoute(routeBuilder, routeBuilderCallback, 'find');

        return axios.get(url)
    }

    public static $find<T extends typeof Entity>(
        this: T,
        uuid: string,
        routeBuilderCallback: ((routeBuilder: FindRouteBuilder) => void) | null = null
    ): Promise<InstanceType<T>> {
        return this.find(uuid, routeBuilderCallback, new FindRouteBuilder()).then((response) => {
            const entity = SingleEntityResponse.fromResponse<SingleEntityResponse<InstanceType<T>>>(response, this);

            EE.emit(new EntityEvent(EventKey.from(EventKey.RETRIEVED).prefixKey(this.constructor.name), entity.entity));

            return entity.entity;
        });
    }

    public static $findWrapped<T extends Entity, B extends SingleEntityResponse<T>>(
        uuid: string,
        routeBuilderCallback: ((routeBuilder: FindWrappedRouteBuilder) => void)
    ): Promise<B> {
        const findWrappedRouteBuilder = new FindWrappedRouteBuilder();
        // @ts-ignore
        return this.find(uuid, routeBuilderCallback, findWrappedRouteBuilder).then((response) => {
            routeBuilderCallback(findWrappedRouteBuilder);

            return findWrappedRouteBuilder.responseClass?.fromResponse(response, this) as Promise<SingleEntityResponse<T>>;
        });
    }

    public $create(routeBuilderCallback: ((routeBuilder: RouteParameterRouteBuilder) => void) | null = null): Promise<Entity | this> {
        const createRouteBuilder = new RouteParameterRouteBuilder();
        const url: string = (this.constructor as typeof Entity).buildRoute(createRouteBuilder, routeBuilderCallback, 'create');

        EE.emit(new EntityEvent(EventKey.from(EventKey.CREATING).prefixKey(this.constructor.name), this));

        return axios
            .post(
                url,
                this.toObject(true)
            )
            .then((response) => {
                const entity = (this.constructor as typeof Entity).create(response.data.data, true);

                EE.emit(new EntityEvent(EventKey.from(EventKey.CREATED).prefixKey(this.constructor.name), entity));

                return entity;
            });
    }

    public $update(routeBuilderCallback: ((routeBuilder: RouteParameterRouteBuilder) => void) | null = null, key: string = this.primaryKey): Promise<Entity | this> {
        const updateRouteBuilder = new RouteParameterRouteBuilder();
        updateRouteBuilder.routeParameter('key', this.attributesBag.get(key));
        const url: string = (this.constructor as typeof Entity).buildRoute(updateRouteBuilder, routeBuilderCallback, 'update');

        EE.emit(new EntityEvent(EventKey.from(EventKey.UPDATING).prefixKey(this.constructor.name), this));

        return axios
            .put(
                url,
                this.toObject(true)
            )
            .then((response) => {
                const entity = (this.constructor as typeof Entity).create(response.data.data, true);

                EE.emit(new EntityEvent(EventKey.from(EventKey.UPDATED).prefixKey(this.constructor.name), entity));

                return entity;
            })
    }

    public $patch(routeBuilderCallback: ((routeBuilder: RouteParameterRouteBuilder) => void) | null = null, key: string = this.primaryKey): Promise<Entity | this> {
        if (!this.isEntityDirty) {
            return new Promise((resolve) => {
                resolve(this);
            });
        }

        const patchRouteBuilder = new RouteParameterRouteBuilder();
        patchRouteBuilder.routeParameter('key', this.attributesBag.get(key));
        const url: string = (this.constructor as typeof Entity).buildRoute(patchRouteBuilder, routeBuilderCallback, 'update');

        EE.emit(new EntityEvent(EventKey.from(EventKey.UPDATING).prefixKey(this.constructor.name), this));

        return axios
            .put(
                url,
                this.toObject(true, true),
            )
            .then((response) => {
                const entity = (this.constructor as typeof Entity).create(response.data.data, true);

                EE.emit(new EntityEvent(EventKey.from(EventKey.UPDATED).prefixKey(this.constructor.name), entity));

                return entity;
            })
    }

    public $delete(routeBuilderCallback: ((routeBuilder: RouteParameterRouteBuilder) => void) | null = null, key: string = this.primaryKey): Promise<Entity | this> {
        const deleteRouteBuilder = new RouteParameterRouteBuilder();
        deleteRouteBuilder.routeParameter('key', this.attributesBag.get(key));
        const url: string = (this.constructor as typeof Entity).buildRoute(deleteRouteBuilder, routeBuilderCallback, 'update');

        EE.emit(new EntityEvent(EventKey.from(EventKey.DELETING).prefixKey(this.constructor.name), this));

        return axios
            .delete(url)
            .then((response) => {
                const entity = (this.constructor as typeof Entity).create(response.data.data, true);

                EE.emit(new EntityEvent(EventKey.from(EventKey.DELETED).prefixKey(this.constructor.name), entity));

                return entity;
            })
    }

    // @todo add correct typings
    protected static buildRoute(routeBuilder: any, routeBuilderCallback: any, routeKey: string): string {
        if (typeof routeBuilderCallback === "function") {
            routeBuilderCallback(routeBuilder);
        }

        const url = Url.replaceUrlParameters(`${Configuration.get('url').base}${this.baseRoute()}${this.routesBag.get(routeKey).route}`, routeBuilder.getRouteParameters());
        const searchParameters = routeBuilder.handle();

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
        throw new Error(`The "baseRoute()" method on ${this.constructor.name} should be extended`);
    }

    protected static create<T extends typeof Entity>(this: T, data: object, fetchedFromServer: boolean = false): InstanceType<T> {
        return new this({...data}, fetchedFromServer) as InstanceType<T>;
    }

    protected buildRelations(attributes: GeneralObject) {
        const camelCaseAttributes = Converter.objectKeysToCamelCase(attributes);
        this.relationsBag.eachType((key, value) => {
            if (camelCaseAttributes[key]) {
                this.relationsBag.createRelation(key, camelCaseAttributes[key]);
            }
        })
    }

    protected static routes(routes: Bag): void {
        return;
    }

    protected attributes(attributes: AttributeBag): void {
        throw new Error(`The "attributes()" method on ${this.constructor.name} should be extended`);
    }

    protected relations(relations: RelationBag): void {
        return;
    }

    protected casts(casts: CastsBag): void {
        return;
    }

    public get(key: string, fallback: any = null): any {
        if (this.attributesBag.has(key)) {
            if (this.castsBag.has(key)) {
                return this.castsBag.performGetCast(key, this.attributesBag.get(key), this);
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
            if (!this.isEntityDirty && this.isInitialized && !this.attributesBag.isEqualTo(key, value)) {
                this.isEntityDirty = true;
            }

            if (this.castsBag.has(key)) {
                this.attributesBag.set(key, this.castsBag.performSetCast(key, value, this));

                return;
            }

            this.attributesBag.set(key, value);

            return;
        }

        if (this.relationsBag.has(key)) {
            this.relationsBag.set(key, value);

            return;
        }

        throw new Error(`The class ${this.constructor.name} does not have a property "${key}"`);
    }

    public getAttributesData(): Collection<any> {
        const attributesData = new Collection();

        this.attributesBag.each((key, item) => {
            attributesData.push({
                key,
                type: this.attributesBag.type(key)?.type,
                setType: []
                    .concat(this.attributesBag.type(key)?.type as any, this.attributesBag.type(key)?.setType as any)
                    .filter((data) => !!data),
            })
        })

        this.relationsBag.eachType((key, item) => {
            attributesData.push({
                key,
                type: [item.many ? `${item.relation.name}[]` : item.relation.name],
                setType: [item.many ? `${item.relation.name}[]` : item.relation.name],
            })
        })

        return attributesData;
    }

    public isDirty() {
        return this.isEntityDirty;
    }

    public toObject(skipUndefined: boolean = false, diff = false): GeneralObject {
        let object: GeneralObject;
        if (diff) {
            object = this.originalBag.diff(this.attributesBag)
        } else {
            object = this.attributesBag.all()
        }

        this.relationsBag.each((key, entity) => {
            if (typeof entity === 'undefined') {
                return
            }

            if (Array.isArray(entity)) {
                const entities: string[] = [];

                entity.forEach((entityObject) => {
                    entities.push(entityObject[this.primaryKey]);
                })

                object[key] = entities;

                return
            }

            object[Converter.toSnakeCase(key)] = entity[this.primaryKey];
        });

        return Converter.objectKeysToSnakeCase(object);
    }
}