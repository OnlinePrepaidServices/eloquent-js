import {RouteParameters} from "./Mixins/RouteParameters";
import {FiltersResources} from "./Mixins/FiltersResources";
import {IncludesResources} from "./Mixins/IncludesResources";
import {RouteBuilder} from "./RouteBuilder";
import {PaginatesResources} from "./Mixins/PaginatesResources";
import {SortsResources} from "./Mixins/SortsResources";
import {OutputsMultipleResources} from "./Mixins/OutputsMultipleResource";

export class GetRouteBuilder extends OutputsMultipleResources(
    SortsResources(
        PaginatesResources(
            RouteParameters(
                FiltersResources(
                    IncludesResources(RouteBuilder)
                )
            )
        )
    )
) {
}