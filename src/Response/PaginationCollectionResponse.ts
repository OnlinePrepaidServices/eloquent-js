import {AxiosResponse} from "axios";
import {EntityCollectionResponse} from "./EntitiyCollectionResponse";
import {Entity} from "../Entity";
import {MetaBag} from "./MetaBag";

export class PaginationCollectionResponse<T extends Entity> extends EntityCollectionResponse<T> {
    public meta: MetaBag = new MetaBag()

    static fromResponse<T extends EntityCollectionResponse<Entity>>(axiosResponse: AxiosResponse, entity: typeof Entity): T {
        const paginationCollection = new this(axiosResponse, entity) as T;

        if (!axiosResponse.data.meta) {
            return paginationCollection;
        }

        paginationCollection.meta.load(axiosResponse.data.meta);

        return paginationCollection;
    }
}