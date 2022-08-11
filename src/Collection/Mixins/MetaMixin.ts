import {Constructor} from "../../Mixins/Constructor";
import {Converter} from "../../Support/Converter";

export class MetaData {
    [key: string]: any;

    public currentPage = undefined;
    public from = undefined;
    public lastPage = undefined;
    public links = undefined;
    public path = undefined;
    public perPage = undefined;
    public to = undefined;
    public total = undefined;

    public loadMetaData(metaData: { [key: string]: any }): this {
        metaData = Converter.objectKeysToLowerCamelCase(metaData);
        Object.keys(metaData).forEach((key) => {
            if (this.hasOwnProperty(key)) {
                this[key] = metaData[key];
            }
        });

        return this;
    }
}

export function MetaMixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public meta: MetaData = new MetaData();
    };
}
