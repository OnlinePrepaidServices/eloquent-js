import {Bag} from "./Bag";
import {Cast} from "../Casts/Cast";
import {GeneralObject} from "../GeneralTypes";
import {Entity} from "../Entity";

export type CastBagParameters = {
    type: Cast;
    parameters: { [key: string]: any };
}

export class CastsBag extends Bag {
    create(key: string, initialValue?: Cast, parameters?: GeneralObject): this {
        super.create(key, {
            type: initialValue,
            parameters,
        })

        return this;
    }

    public performGetCast(key: string, value: any, entity: Entity): any {
        const parameters = this.get<CastBagParameters>(key);

        return parameters.type.get(value, entity, parameters.parameters);
    }

    public performSetCast(key: string, value: any, entity: Entity): any {
        const parameters = this.get<CastBagParameters>(key);

        return parameters.type.set(value, entity, parameters.parameters);
    }
}