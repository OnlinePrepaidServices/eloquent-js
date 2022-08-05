import { Bag } from "../Bag/Bag";
export declare class RouteBuilder {
    protected data: Bag;
    protected routeParameters: {
        [key: string]: any;
    };
    handle(): string;
}
