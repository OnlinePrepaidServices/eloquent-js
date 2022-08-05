import {Bag} from "../Bag/Bag";
import {RouteBuilderBag} from "./RouteBuilderBag";

// export interface RouteBuilder {
//     [key: string]: any;
// }

export class RouteBuilder {
    protected data: Bag = new Bag();
    protected routeParameters: {[key:string]: any} = {};

    public handle(): string {
        let searchResults: { [key: string]: any } = {}

        Object.keys(this.data.all()).forEach((key) => {
            if (!RouteBuilderBag.has(key)) {
                return;
            }

            RouteBuilderBag.get(key)(this.data.get(key)).forEach((data: { key: string, value: string }) => {
                searchResults[data.key] = data.value;
            });
        });

        return new URLSearchParams(searchResults).toString();
    }
}

