import {RouteParameters} from "./Mixins/RouteParameters";
import {FilterResources} from "./Mixins/FilterResources";
import {IncludesResources} from "./Mixins/IncludesResources";
import {RouteBuilder} from "./RouteBuilder";

export class FindRouteBuilder extends RouteParameters(FilterResources(IncludesResources(RouteBuilder))){}