"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
var Converter = /** @class */ (function () {
    function Converter() {
    }
    Converter.toSnakeCase = function (value) {
        return value.replace(/[A-Z]/g, function (letter) { return "_".concat(letter.toLowerCase()); });
    };
    Converter.toLowerCamelCase = function (value) {
        return value.replace(/([-_]\w)/g, function (g) { return g[1].toUpperCase(); });
    };
    Converter.objectKeysToSnakeCase = function (object) {
        var result = {};
        for (var _i = 0, _a = Object.entries(object); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            result[this.toSnakeCase(key)] = value;
        }
        return result;
    };
    Converter.objectKeysToLowerCamelCase = function (object) {
        var result = {};
        for (var _i = 0, _a = Object.entries(object); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            result[this.toLowerCamelCase(key)] = value;
        }
        return result;
    };
    return Converter;
}());
exports.Converter = Converter;
