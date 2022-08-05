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
exports.Entity = void 0;
var axios_1 = require("axios");
var AttributeBag_1 = require("./Bag/AttributeBag");
var Bag_1 = require("./Bag/Bag");
var RelationBag_1 = require("./Bag/RelationBag");
var Configuration_1 = require("./Configuration");
var Url_1 = require("./Support/Url");
var collect_js_1 = require("collect.js");
var Converter_1 = require("./Support/Converter");
var GetRouteBuilder_1 = require("./Builder/GetRouteBuilder");
var FindRouteBuilder_1 = require("./Builder/FindRouteBuilder");
/**
 * @todo Generate setters and getter automatically Regex: (get\s+([a-z]+)\(\)[\s]*\{\s*return\s+this.get\(["'][a-zA-Z]+["']\)[;][\s]*})
 */
var Entity = /** @class */ (function () {
    function Entity(attributes) {
        if (attributes === void 0) { attributes = {}; }
        this.relationsBag = new RelationBag_1.RelationBag();
        this.castsBag = new Bag_1.Bag();
        this.attributesBag = new AttributeBag_1.AttributeBag();
        this.attributes(this.attributesBag);
        this.attributesBag.load(attributes);
        this.relations(this.relationsBag);
        this.buildRelations(attributes);
        this.casts(this.castsBag);
        this.constructor.initiateRoutes();
        this.originalBag = this.attributesBag.clone();
    }
    Entity.initiateRoutes = function () {
        if (this.routesInitiated) {
            return;
        }
        this.routesBag = new Bag_1.Bag(Configuration_1.Configuration.get('routes'));
        this.routes(this.routesBag);
        this.routesInitiated = true;
    };
    Entity.prototype.buildRelations = function (attributes) {
        var _this = this;
        var lowerCamelCaseAttributes = Converter_1.Converter.objectKeysToLowerCamelCase(attributes);
        this.relationsBag.eachType(function (key, value) {
            if (lowerCamelCaseAttributes[key]) {
                _this.relationsBag.createRelation(key, lowerCamelCaseAttributes[key]);
            }
        });
    };
    Entity.routes = function (routes) {
    };
    Entity.prototype.attributes = function (attributes) {
        throw "The \"attributes()\" method on ".concat(this.constructor.name, " should be extended");
    };
    Entity.prototype.relations = function (relations) {
    };
    Entity.prototype.casts = function (casts) {
    };
    Entity.baseRoute = function () {
        throw "The \"baseRoute()\" method on ".concat(this.constructor.name, " should be extended");
    };
    Entity.create = function (data) {
        return new this(__assign({}, data));
    };
    Entity.$get = function (routeBuilderCallback) {
        var _this = this;
        if (routeBuilderCallback === void 0) { routeBuilderCallback = null; }
        this.initiateRoutes();
        var getRouteBuilder = new GetRouteBuilder_1.GetRouteBuilder();
        if (routeBuilderCallback) {
            routeBuilderCallback(getRouteBuilder);
        }
        var url = Url_1.Url.replaceUrlParameters("".concat(Configuration_1.Configuration.get('url').base).concat(this.baseRoute()).concat(this.routesBag.get('get').route), getRouteBuilder.getRouteParameters());
        return axios_1.default.get(url).then(function (response) {
            var entities = new collect_js_1.Collection();
            response.data.data.forEach(function (value) {
                entities.push(_this.create(value));
            });
            return entities;
        });
    };
    Entity.$find = function (uuid, routeBuilderCallback) {
        var _this = this;
        if (routeBuilderCallback === void 0) { routeBuilderCallback = null; }
        this.initiateRoutes();
        var findRouteBuilder = new FindRouteBuilder_1.FindRouteBuilder();
        findRouteBuilder.routeParameter('key', uuid);
        if (routeBuilderCallback) {
            routeBuilderCallback(findRouteBuilder);
        }
        var url = Url_1.Url.replaceUrlParameters("".concat(Configuration_1.Configuration.get('url').base).concat(this.baseRoute()).concat(this.routesBag.get('find').route), findRouteBuilder.getRouteParameters());
        return axios_1.default.get(url).then(function (response) {
            return _this.create(response.data.data);
        });
    };
    Entity.prototype.get = function (key, fallback) {
        if (fallback === void 0) { fallback = null; }
        if (this.attributesBag.has(key)) {
            if (this.castsBag.has(key)) {
                return this.castsBag.get(key).get(this.attributesBag.get(key));
            }
            return this.attributesBag.get(key);
        }
        if (this.relationsBag.has(key)) {
            return this.relationsBag.get(key);
        }
        return fallback;
    };
    Entity.prototype.set = function (key, value) {
        if (this.attributesBag.has(key)) {
            if (this.castsBag.has(key)) {
                this.attributesBag.set(key, this.castsBag.get(key).get(key));
                return;
            }
            this.attributesBag.set(key, value);
            return;
        }
        if (this.relationsBag.has(key)) {
            this.relationsBag.set(key, value);
            return;
        }
        throw "The class ".concat(this.constructor.name, " does not have a property \"").concat(key, "\"");
    };
    Entity.prototype.toObject = function (skipUndefined) {
        if (skipUndefined === void 0) { skipUndefined = false; }
        return Converter_1.Converter.objectKeysToSnakeCase(this.attributesBag.all());
    };
    Entity.routesInitiated = false;
    return Entity;
}());
exports.Entity = Entity;
