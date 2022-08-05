"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBag = exports.Bag = void 0;
var Bag = /** @class */ (function () {
    function Bag(items) {
        if (items === void 0) { items = {}; }
        this.items = {};
        this.items = items;
    }
    Bag.prototype.load = function (data) {
        this.items = data;
        return this;
    };
    Bag.prototype.get = function (key, fallback) {
        if (fallback === void 0) { fallback = undefined; }
        if (this.items.hasOwnProperty(key)) {
            return this.items[key];
        }
        return fallback;
    };
    Bag.prototype.set = function (key, value) {
        this.items[key] = value;
        return this;
    };
    Bag.prototype.each = function (callback) {
        var _this = this;
        Object.keys(this.items).forEach(function (key) {
            callback(key, _this.items[key]);
        });
    };
    Bag.prototype.has = function (key) {
        return this.items.hasOwnProperty(key);
    };
    Bag.prototype.all = function (skipUndefined) {
        if (skipUndefined === void 0) { skipUndefined = false; }
        var result = __assign({}, this.items);
        if (skipUndefined) {
            Object.keys(result).forEach(function (keys) {
                if (typeof result[keys] === 'undefined') {
                    delete result[keys];
                }
            });
        }
        return result;
    };
    Bag.prototype.clone = function () {
        return new this.constructor(__assign({}, this.items));
    };
    Bag.prototype.isEmpty = function () {
        return Object.keys(this.items).length === 0;
    };
    Bag.prototype.isNotEmpty = function () {
        return !this.isEmpty();
    };
    Bag.prototype.create = function (key, initialValue) {
        if (initialValue === void 0) { initialValue = undefined; }
        if (this.has(key)) {
            return this;
        }
        this.items[key] = initialValue;
        return this;
    };
    return Bag;
}());
exports.Bag = Bag;
function getBag(object, key) {
    return object[key];
}
exports.getBag = getBag;
