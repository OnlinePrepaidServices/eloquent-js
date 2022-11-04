import {Constructor} from "../../Mixins/Constructor";
import {RouteBuilderBag} from "../RouteBuilderBag";
import {Bag, getBag} from "../../Bag/Bag";

type filterArguments = { key: string, value: any }

const name: string = 'filters';

RouteBuilderBag.set(name, (filters: { key: string, value: string }[]): { key: string, value: string }[] => {
    const filterResult: { key: string, value: string }[] = [];
    filters.forEach((filter) => {
        filterResult.push({
            key: `filter[${filter.key}]`,
            value: filter.value,
        });
    })


    return filterResult;
});

export function FiltersResources<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        filter(key: string, value: string): this {
            // @todo fix this hack
            getBag(this, 'data')
                .create(name, [])
                .get(name)
                .push({
                    key: key,
                    value: value,
                });

            return this;
        }

        filters(filters: filterArguments[]) {
            filters.forEach((filter) => {
                this.filter(filter.key, filter.value);
            })

            return this;
        }
    };
}