import {Constructor} from "../../Mixins/Constructor";
import {RouteBuilderBag} from "../RouteBuilderBag";
import {getBag} from "../../Bag/Bag";

RouteBuilderBag.set('includes', (includes: string[]): { key: string, value: string }[] => {
    return [{
        key: 'include',
        value: includes.join(',')
    }];
});

export function IncludesResources<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        include(include: string): this {
            // @todo fix this hack
            getBag(this, 'data')
                .create('includes', [])
                .get('includes')
                .push(include);

            return this;
        }
    };
}