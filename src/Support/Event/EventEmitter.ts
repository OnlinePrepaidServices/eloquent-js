import {AbstractEvent} from "./AbstractEvent";
import {AbstractListener} from "./AbstractListener";
import {Listeners} from "./Listeners";

export class EventEmitter {
    listeners: Listeners = new Listeners();

    public on<T extends AbstractListener>(listener: T) {
        this.listeners.add(listener)
    }

    public off<T extends AbstractListener>(listener: T) {
        // @todo to be implemented
    }

    public emit<T extends AbstractEvent>(event: T) {
        this.listeners.find(event.key).forEach((listener) => {
            listener.handle(event);
        });
    }
}
