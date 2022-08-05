import { Constructor } from "../../Mixins/Constructor";
export declare function RouteParameters<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        routeParameter(key: string, value: number | string): void;
        getRouteParameters(): string[] | number[];
    };
} & TBase;
