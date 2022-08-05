import {RouteParameters} from "./Mixins/RouteParameters";
import {FilterResources} from "./Mixins/FilterResources";
import {IncludesResources} from "./Mixins/IncludesResources";
import {RouteBuilder} from "./RouteBuilder";

export class GetRouteBuilder extends RouteParameters(FilterResources(IncludesResources(RouteBuilder))){}