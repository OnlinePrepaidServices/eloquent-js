import {AbstractEvent} from "../../Support/Event/AbstractEvent";

export class TestEvent extends AbstractEvent {
    readonly key: string;

    constructor(key: string) {
        super();
        this.key = key;
    }
}