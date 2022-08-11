import {EntityCollection} from "./EntitiyCollection";
import {Collection} from "collect.js";

export class DefaultCollection<T> extends EntityCollection{
    public entities: Collection<T> = new Collection<T>();
}
