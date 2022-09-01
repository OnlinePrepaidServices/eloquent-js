import {Constructor} from "../../Mixins/Constructor";
import {SingleEntityResponse} from "../../Response/SingleEntityResponse";

export function OutputsOneResource<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        responseClass: typeof SingleEntityResponse<any> | undefined

        public response(responseClass: typeof SingleEntityResponse<any> | undefined) {
            this.responseClass = responseClass;

            return this;
        }
    };
}