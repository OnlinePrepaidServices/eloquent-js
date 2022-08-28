import {FiltersResources} from "./Mixins/FiltersResources";
import {IncludesResources} from "./Mixins/IncludesResources";
import {RouteBuilder} from "./RouteBuilder";
import {RouteParameters} from "./Mixins/RouteParameters";

export class FindRouteBuilder extends RouteParameters(
    FiltersResources(
        IncludesResources(
            RouteBuilder
        )
    )
) {
}