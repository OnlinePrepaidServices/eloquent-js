import {EntityCollection} from "./EntitiyCollection";
import {MetaBag} from "./MetaBag";
import {Entity} from "../Entity";
import {AxiosResponse} from "axios";

export class PaginationCollection<T extends Entity> extends EntityCollection<T> {
    public meta: MetaBag = new MetaBag()

    protected createFromResponse(axiosResponse: AxiosResponse, entity: typeof Entity, entityCollection: EntityCollection<T>): EntityCollection<T> {
        super.createFromResponse(axiosResponse, entity, entityCollection);

        if(!axiosResponse.data.meta){
            return entityCollection;
        }

        this.meta.load(axiosResponse.data.meta);

        return entityCollection;
    }
}