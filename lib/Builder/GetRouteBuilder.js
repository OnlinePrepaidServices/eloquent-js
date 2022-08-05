"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRouteBuilder = void 0;
var RouteParameters_1 = require("./Mixins/RouteParameters");
var FilterResources_1 = require("./Mixins/FilterResources");
var IncludesResources_1 = require("./Mixins/IncludesResources");
var RouteBuilder_1 = require("./RouteBuilder");
var GetRouteBuilder = /** @class */ (function (_super) {
    __extends(GetRouteBuilder, _super);
    function GetRouteBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GetRouteBuilder;
}((0, RouteParameters_1.RouteParameters)((0, FilterResources_1.FilterResources)((0, IncludesResources_1.IncludesResources)(RouteBuilder_1.RouteBuilder)))));
exports.GetRouteBuilder = GetRouteBuilder;
