import { Bag } from "./Bag/Bag";
export declare const Configuration: {
    configuration: Bag;
    load(configuration: object): void;
    all(): object;
    get(key: string | number, fallback?: any): any;
    set(key: string, value: any): Bag;
    has(key: string): boolean;
};
