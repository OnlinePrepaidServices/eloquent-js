"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Url = void 0;
var Configuration_1 = require("../Configuration");
var Url = /** @class */ (function () {
    function Url() {
    }
    Url.parseUrlParameters = function (url) {
        var regex = new RegExp(Configuration_1.Configuration.get('url').regex);
        var matches = [];
        var result = [];
        while (matches = regex.exec(url)) {
            result.push(matches[1]);
        }
        return result;
    };
    Url.getUrlParameters = function (url, parameters) {
        if (parameters === void 0) { parameters = {}; }
        var urlParameterNames = this.parseUrlParameters(url);
        // @todo replace objects vs arrays so a variable can be used multiple times.
        var parameterObject = {};
        urlParameterNames.forEach(function (value, index) {
            if (!parameters || parameters[value] === undefined) {
                throw 'Missing parameter [' + value + '] to getUrlParameters()';
            }
            parameterObject[value] = parameters[value];
        });
        return parameterObject;
    };
    Url.replaceUrlParameters = function (url, parameters) {
        if (parameters === void 0) { parameters = {}; }
        var urlWithParameters = url;
        var parameterObject = this.getUrlParameters(url, parameters);
        Object.entries(parameterObject).forEach(function (entry) {
            var key = entry[0], value = entry[1];
            // @todo let's make this configurable.
            if (value === null) {
                return;
            }
            urlWithParameters = urlWithParameters.replace('{' + key + '}', value);
        });
        return urlWithParameters;
    };
    return Url;
}());
exports.Url = Url;
