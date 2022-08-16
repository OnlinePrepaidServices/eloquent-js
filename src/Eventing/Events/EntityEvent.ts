import {AbstractEvent} from "../../Support/Event/AbstractEvent";
import {Entity} from "../../Entity";

export class EntityEvent extends AbstractEvent {
    readonly key: string;
    readonly entity: Entity;

    constructor(key: string, entity: Entity) {
        super();

        this.key = key;
        this.entity = entity;
    }
}