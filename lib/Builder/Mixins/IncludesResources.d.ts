import { Constructor } from "../../Mixins/Constructor";
export declare function IncludesResources<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        include(include: string): this;
    };
} & TBase;
