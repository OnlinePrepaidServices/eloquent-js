import {Bag} from "../Bag/Bag";
import {RouteBuilderBag} from "./RouteBuilderBag";

export class RouteBuilder {
    protected data: Bag = new Bag();
    // @todo move to separate class
    protected routeParameters: { [key: string]: any } = {};

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

    public when(condition: boolean, callback: (builder: this) => void) {
        if (condition) {
            callback(this);
        }

        return this;
    }
}
