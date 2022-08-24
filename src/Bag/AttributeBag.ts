import {Bag} from "./Bag";
import {Converter} from "../Support/Converter";
import {GeneralObjectType} from "../GeneralTypes";

type Types = { type: any[] | unknown, setType: any[] | unknown };

export class AttributeBag extends Bag {
    protected types: GeneralObjectType<Types> = {};

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

        return super.create(key, initialValue);
    }

    public type(key: string): Types | undefined {
        return this.types[key] ?? undefined;
    }
}