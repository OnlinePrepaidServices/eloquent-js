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
exports.AttributeBag = void 0;
var Bag_1 = require("./Bag");
var Converter_1 = require("../Support/Converter");
var AttributeBag = /** @class */ (function (_super) {
    __extends(AttributeBag, _super);
    function AttributeBag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AttributeBag.prototype.load = function (data) {
        var _this = this;
        var convertedData = Converter_1.Converter.objectKeysToLowerCamelCase(data);
        Object.keys(convertedData).forEach(function (key) {
            if (_this.has(key)) {
                _this.set(key, convertedData[key]);
            }
        });
        return this;
    };
    return AttributeBag;
}(Bag_1.Bag));
exports.AttributeBag = AttributeBag;
