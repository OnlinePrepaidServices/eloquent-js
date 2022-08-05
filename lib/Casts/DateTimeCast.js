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
exports.DateTimeCast = void 0;
var Cast_1 = require("./Cast");
var moment = require("moment/moment");
var DateTimeCast = /** @class */ (function (_super) {
    __extends(DateTimeCast, _super);
    function DateTimeCast() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeCast.get = function (value) {
        if (!value) {
            return null;
        }
        return moment(value);
    };
    DateTimeCast.set = function (value) {
        var date;
        if (!value) {
            return null;
        }
        if (typeof value === 'string' && (date = moment(value)) && date.isValid()) {
            return date.format();
        }
        return value.format();
    };
    return DateTimeCast;
}(Cast_1.Cast));
exports.DateTimeCast = DateTimeCast;
