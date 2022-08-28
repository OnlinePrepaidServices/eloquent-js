import {Constructor} from "../../Mixins/Constructor";
import {SingleEntityResponse} from "../../Response/SingleEntityResponse";

export function OutputsOneResource<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        outputClass: typeof SingleEntityResponse<any> | undefined
    };
}