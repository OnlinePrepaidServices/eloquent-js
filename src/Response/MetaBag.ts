import {Bag} from "../Bag/Bag";
import {GeneralObject} from "../GeneralTypes";
import {Converter} from "../Support/Converter";

export class MetaBag {
    [key: string]: any

    public currentPage = undefined;
    public from = undefined;
    public lastPage = undefined;
    public links = undefined;
    public path = undefined;
    public perPage = undefined;
    public to = undefined;
    public total = undefined;

    public load(data: GeneralObject): void {
        data = Converter.objectKeysToCamelCase(data);
        Object.keys(data).forEach((key) => {
            this[key] = data[key];
        })
    }
}