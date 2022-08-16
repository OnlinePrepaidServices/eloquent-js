import {AbstractListener} from "./AbstractListener";

export class ListenerCollection {
    readonly key: string;
    protected wildcardStatus: boolean | null = null;

    protected items: Array<AbstractListener> = [];

    constructor(key: string) {
        this.key = key;
    }

    public push(listener: AbstractListener) {
        this.items.push(listener);
    }

    public all(): Array<AbstractListener> {
        return this.items;
    }

    get isWildcard(): boolean {
        if (this.wildcardStatus === null) {
            this.wildcardStatus = this.key.endsWith('.*');
        }

        return this.wildcardStatus;
    }

    public match(key: string): boolean {
        if (this.key === '*' || key === this.key) {
            return true;
        }

        if (this.isWildcard) {
            return !!key.startsWith(this.key.replace('*', ''));
        }

        return false;
    }
}