import {Constructor} from "../../Mixins/Constructor";
import {EntityCollectionResponse} from "../../Response/EntitiyCollectionResponse";

export function OutputsMultipleResources<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        outputClass: typeof EntityCollectionResponse<any> | undefined
    };
}