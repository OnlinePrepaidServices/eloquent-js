import {Bag} from "./Bag";
import {Entity} from "../Entity";

export class RelationBag extends Bag {
    // @todo add type hint for extends Entity
    protected types: { [key: string]: any };

    constructor() {
        super();

        this.types = {};
    }

    // @todo add type hint for extends Entity
    public create<T>(key: string, relation: any, many: boolean = false) {
        this.items[key] = undefined;
        this.types[key] = {
            relation,
            many
        };

        return this;
    }

    public hasType(relation: string): boolean {
        return !!this.types[relation];
    }

    public eachType(callback: (key: string, value: any) => void) {
        Object.keys(this.types).forEach((key) => {
            callback(key, this.types[key]);
        })
    }

    public createRelation(relation: string, attributes: {}) {
        if (!this.hasType(relation)) {
            return null;
        }

        if (Array.isArray(attributes)) {
            const entities: Entity[] = [];

            attributes.forEach((value) => {
                entities.push(new this.types[relation].relation(value));
            });

            this.set(relation, entities);
        } else {
            this.set(relation, new this.types[relation].relation(attributes));
        }
    }
}