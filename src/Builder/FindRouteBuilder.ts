import {RouteParameters} from "./Mixins/RouteParameters";
import {FiltersResources} from "./Mixins/FiltersResources";
import {IncludesResources} from "./Mixins/IncludesResources";
import {RouteBuilder} from "./RouteBuilder";

export class FindRouteBuilder extends RouteParameters(
    FiltersResources(
        IncludesResources(
            RouteBuilder
        )
    )
){}