import {Bag} from "./Bag/Bag";

export const Configuration = {
    configuration: new Bag() as Bag,

    load(configuration: object) {
        this.configuration.load(configuration);
    },

    all(): object {
        return this.configuration.all();
    },

    // @todo dot notation
    get(key: string | number, fallback: any = null): any {
        return this.configuration.get(key, fallback);
    },

    // @todo dot notation
    set(key: string, value: any): Bag {
        this.configuration.set(key, value)

        return this.configuration;
    },

    has(key: string) {
        return this.configuration.has(key);
    }
}