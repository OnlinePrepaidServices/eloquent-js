import {AxiosResponse} from "axios";
import {Entity} from "../Entity";

export class SingleEntityResponse<T extends Entity> {
    readonly entity: T

    constructor(entity: T) {
        this.entity = entity;
    }

    static fromResponse<T>(axiosResponse: AxiosResponse, entity: typeof Entity): T {
        return new this(new entity(axiosResponse.data.data, true)) as unknown as T;
    }
}