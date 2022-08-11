import {Bag} from "./Bag";

export class CastsBag extends Bag {
    create(key: string, initialValue: any = undefined, parameters: { [key: string]: any } = {}): this {
        super.create(key, {
            type: initialValue,
            parameters: parameters,
        })

        return this;
    }
}