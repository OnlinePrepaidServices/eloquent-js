import {AbstractListener} from "./AbstractListener";
import {ListenerCollection} from "./ListenerCollection";

export class Listeners {
    protected items: { [key: string]: ListenerCollection } = {};

    public add(listener: AbstractListener) {
        if (!this.items[listener.key]) {
            this.items[listener.key] = new ListenerCollection(listener.key);
        }

        this.items[listener.key].push(listener);
    }

    public find(key: string): Array<AbstractListener> {
        let listeners: Array<AbstractListener> = [];

        Object.keys(this.items).forEach((objectKey: string) => {
            if(this.items[objectKey].match(key)){
                listeners = listeners.concat(this.items[objectKey].all());
            }
        });

        return listeners;
    }

    public all() {
        return this.items;
    }
}