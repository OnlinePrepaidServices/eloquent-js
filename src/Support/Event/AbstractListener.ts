import {AbstractEvent} from "./AbstractEvent";

export abstract class AbstractListener {
    abstract readonly key: string;

    public abstract handle(event: AbstractEvent): void;

    public isWildcardKey(): boolean {
        return !!this.key.endsWith('.*');
    }
}