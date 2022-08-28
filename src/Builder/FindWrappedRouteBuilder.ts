import {OutputsOneResource} from "./Mixins/OutputsOneResource";
import {RouteParameters} from "./Mixins/RouteParameters";
import {FiltersResources} from "./Mixins/FiltersResources";
import {IncludesResources} from "./Mixins/IncludesResources";
import {RouteBuilder} from "./RouteBuilder";

export class FindWrappedRouteBuilder extends OutputsOneResource(
    RouteParameters(
        FiltersResources(
            IncludesResources(
                RouteBuilder
            )
        )
    )
) {
}