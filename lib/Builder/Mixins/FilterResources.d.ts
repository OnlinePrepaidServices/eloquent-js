import { Constructor } from "../../Mixins/Constructor";
export declare function FilterResources<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        filter(key: string, value: string): this;
    };
} & TBase;
