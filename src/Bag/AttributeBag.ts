import {Bag} from "./Bag";
import {Converter} from "../Support/Converter";
import {GeneralObjectType} from "../GeneralTypes";
import {Entity} from "../Entity";

type Types = { type: any[] | unknown, setType: any[] | unknown };

export class AttributeBag extends Bag {
    protected types: GeneralObjectType<Types> = {};

    constructor(items: object = {}, protected entity: Entity) {
        super(items);
    }

    public load(data: { [key: string]: any }): this {
        const convertedData = Converter.objectKeysToCamelCase(data);
        Object.keys(convertedData).forEach((key: string) => {
            if (this.has(key)) {
                this.set(key, convertedData[key]);
            }
        })

        return this;
    }

    public create(key: string, initialValue?: any, type?: any[], setType?: any[]): this {
        if (type) {
            this.types[key] = {
                type,
                setType
            };
        }

        return super.create(key, this.entity.castsBag.performSetCast(key, initialValue, this.entity));
    }

    public type(key: string): Types | undefined {
        return this.types[key] ?? undefined;
    }

    public unsetEntity(): void {
        // @ts-ignore
        this.entity = undefined;
    }
}