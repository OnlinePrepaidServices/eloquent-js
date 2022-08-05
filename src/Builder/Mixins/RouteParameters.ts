import {Constructor} from "../../Mixins/Constructor";

export function RouteParameters<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public routeParameter(key: string, value: number | string) {
            // @ts-ignore @todo Make this more elegant
            this.routeParameters[key] = value;
        }

        public getRouteParameters(): string[] | number[] {
            // @ts-ignore
            return this.routeParameters;
        }
    };
}