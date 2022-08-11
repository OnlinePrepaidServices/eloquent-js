import {Collection} from "collect.js";
import {Entity} from "../Entity";

export class EntityCollection {
    public entities: Collection<any> = new Collection<any>();
    // constructor(response: AxiosResponse) {
    //     this.meta = new MetaResponse(response.data.meta);
    // }
    //
    // push(entity: T) {
    //     this.entities.push(entity);
    //
    //     return this;
    // }

    push(item: Entity): this {
        this.entities.push(item);

        return this;
    }
}
