import {EntityCollection} from "./EntitiyCollection";
import {MetaMixin} from "./Mixins/MetaMixin";
import {Collection} from "collect.js";
import {Entity} from "../Entity";

export class PaginationCollection<T> extends MetaMixin(EntityCollection){
    public entities: Collection<T> = new Collection<T>();
}