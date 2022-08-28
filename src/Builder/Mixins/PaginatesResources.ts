import {Constructor} from "../../Mixins/Constructor";
import {RouteBuilderBag} from "../RouteBuilderBag";
import {getBag} from "../../Bag/Bag";

RouteBuilderBag.set(
    'pagination',
    (pagination: { page: number, perPage: number }[]): { key: string, value: string }[] => {
        return [
            {
                key: 'page',
                value: pagination[0].page.toString()
            },
            {
                key: 'per_page',
                value: pagination[0].perPage.toString()
            },
        ];
    }
);

export function PaginatesResources<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        paginate(page: number = 1, perPage: number = 15) {
            getBag(this, 'data')
                .set('pagination', [{
                    page,
                    perPage
                }]);

            return this;
        }
    };
}