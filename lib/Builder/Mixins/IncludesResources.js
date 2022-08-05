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
exports.IncludesResources = void 0;
var RouteBuilderBag_1 = require("../RouteBuilderBag");
var Bag_1 = require("../../Bag/Bag");
RouteBuilderBag_1.RouteBuilderBag.set('includes', function (includes) {
    return [{
            key: 'include',
            value: includes.join(',')
        }];
});
function IncludesResources(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.include = function (include) {
            // @todo fix this hack
            (0, Bag_1.getBag)(this, 'data')
                .create('includes', [])
                .get('includes')
                .push(include);
            return this;
        };
        return class_1;
    }(Base));
}
exports.IncludesResources = IncludesResources;
