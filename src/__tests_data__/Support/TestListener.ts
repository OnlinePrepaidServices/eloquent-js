import {AbstractListener} from "../../Support/Event/AbstractListener";
import {TestEvent} from "./TestEvent";

export class TestListener extends AbstractListener {
    readonly key: string;

    constructor(key: string) {
        super();

        this.key = key;
    }

    handle(event: TestEvent): void {
        expect(event).toBeInstanceOf(TestEvent);
    }
}