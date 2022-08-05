"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteBuilder = void 0;
var Bag_1 = require("../Bag/Bag");
var RouteBuilderBag_1 = require("./RouteBuilderBag");
// export interface RouteBuilder {
//     [key: string]: any;
// }
var RouteBuilder = /** @class */ (function () {
    function RouteBuilder() {
        this.data = new Bag_1.Bag();
        this.routeParameters = {};
    }
    RouteBuilder.prototype.handle = function () {
        var _this = this;
        var searchResults = {};
        Object.keys(this.data.all()).forEach(function (key) {
            if (!RouteBuilderBag_1.RouteBuilderBag.has(key)) {
                return;
            }
            RouteBuilderBag_1.RouteBuilderBag.get(key)(_this.data.get(key)).forEach(function (data) {
                searchResults[data.key] = data.value;
            });
        });
        return new URLSearchParams(searchResults).toString();
    };
    return RouteBuilder;
}());
exports.RouteBuilder = RouteBuilder;
