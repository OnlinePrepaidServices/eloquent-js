import {Constructor} from "../../Mixins/Constructor";
import {EntityCollectionResponse} from "../../Response/EntitiyCollectionResponse";
import {SingleEntityResponse} from "../../Response/SingleEntityResponse";

export function OutputsMultipleResources<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        responseClass: typeof EntityCollectionResponse<any> | undefined

        public response(responseClass: typeof EntityCollectionResponse<any> | undefined) {
            this.responseClass = responseClass;

            return this;
        }
    };
}