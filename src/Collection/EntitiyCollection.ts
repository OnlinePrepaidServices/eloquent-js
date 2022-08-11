import {Collection} from "collect.js";
import {MetaBag} from "./MetaBag";
import {AxiosResponse} from "axios";
import {Entity} from "../Entity";
import {GeneralObject} from "../GeneralTypes";

export class EntityCollection<T extends Entity> {
    public entities: Collection<T> = new Collection<T>();
    public meta: MetaBag = new MetaBag();

    static fromResponse<T>(axiosResponse: AxiosResponse, entity: typeof Entity): T {
        const entityCollection = new this();

        entityCollection.createFromResponse(axiosResponse, entity, entityCollection)

        return entityCollection as unknown as T;
    }

    protected createFromResponse(axiosResponse: AxiosResponse, entity: typeof Entity, entityCollection: EntityCollection<T>): EntityCollection<T> {
        axiosResponse.data.data.forEach((data: GeneralObject) => {
            entityCollection.entities.push(new entity(data, true) as unknown as T);
        })

        return entityCollection as EntityCollection<T>;
    }
}
