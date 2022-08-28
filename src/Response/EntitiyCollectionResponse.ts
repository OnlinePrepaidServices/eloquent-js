import {AxiosResponse} from "axios";
import {Collection} from "collect.js";
import {Entity} from "../Entity";
import {GeneralObject} from "../GeneralTypes";
import {MetaBag} from "./MetaBag";

export class EntityCollectionResponse<T extends Entity> {
    readonly entities: Collection<T> = new Collection<T>();
    readonly meta: MetaBag = new MetaBag();
    readonly response: AxiosResponse;

    public constructor(axiosResponse: AxiosResponse, entity: typeof Entity) {
        this.response = axiosResponse;

        axiosResponse.data.data.forEach((data: GeneralObject) => {
            this.entities.push(new entity(data, true) as unknown as T);
        })

        return this as EntityCollectionResponse<T>;
    }

    static fromResponse<T extends EntityCollectionResponse<Entity>>(axiosResponse: AxiosResponse, entity: typeof Entity): T {
        return new this(axiosResponse, entity) as T;
    }
}
