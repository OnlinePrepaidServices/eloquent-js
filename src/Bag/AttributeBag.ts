import {Bag} from "./Bag";
import {Converter} from "../Support/Converter";

export class AttributeBag extends Bag {
    public load(data: {[key: string]: any}): this {
        const convertedData = Converter.objectKeysToLowerCamelCase(data);
        Object.keys(convertedData).forEach((key: string) => {
            if (this.has(key)) {
                this.set(key, convertedData[key]);
            }
        })

        return this;
    }
}