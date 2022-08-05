import { RouteBuilder } from "./RouteBuilder";
declare const FindRouteBuilder_base: {
    new (...args: any[]): {
        routeParameter(key: string, value: string | number): void;
        getRouteParameters(): string[] | number[];
    };
} & {
    new (...args: any[]): {
        filter(key: string, value: string): any;
    };
} & {
    new (...args: any[]): {
        include(include: string): any;
    };
} & typeof RouteBuilder;
export declare class FindRouteBuilder extends FindRouteBuilder_base {
}
export {};
