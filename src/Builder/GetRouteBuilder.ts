import {RouteParameters} from "./Mixins/RouteParameters";
import {FilterResources} from "./Mixins/FilterResources";
import {IncludesResources} from "./Mixins/IncludesResources";
import {RouteBuilder} from "./RouteBuilder";
import {PaginatesResources} from "./Mixins/PaginatesResources";

export class GetRouteBuilder extends PaginatesResources(RouteParameters(FilterResources(IncludesResources(RouteBuilder)))){}