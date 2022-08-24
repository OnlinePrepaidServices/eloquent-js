import {Constructor} from "../../Mixins/Constructor";
import {RouteBuilderBag} from "../RouteBuilderBag";
import {getBag} from "../../Bag/Bag";

RouteBuilderBag.set('sort', (sort: string[]): { key: string, value: string }[] => {
    return [{
        key: 'sort',
        value: sort.join(',')
    }];
});

export function SortsResources<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        sort(sort: string): this {
            // @todo fix this hack
            getBag(this, 'data')
                .create('sort', [])
                .get('sort')
                .push(sort);

            return this;
        }
    };
}