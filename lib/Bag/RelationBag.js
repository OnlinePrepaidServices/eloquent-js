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
exports.RelationBag = void 0;
var Bag_1 = require("./Bag");
var RelationBag = /** @class */ (function (_super) {
    __extends(RelationBag, _super);
    function RelationBag() {
        var _this = _super.call(this) || this;
        _this.types = {};
        return _this;
    }
    // @todo add type hint for extends Entity
    RelationBag.prototype.create = function (key, relation) {
        this.items[key] = undefined;
        this.types[key] = relation;
        return this;
    };
    RelationBag.prototype.hasType = function (relation) {
        return !!this.types[relation];
    };
    RelationBag.prototype.eachType = function (callback) {
        var _this = this;
        Object.keys(this.types).forEach(function (key) {
            callback(key, _this.types[key]);
        });
    };
    RelationBag.prototype.createRelation = function (relation, attributes) {
        var _this = this;
        if (!this.hasType(relation)) {
            return null;
        }
        if (Array.isArray(attributes)) {
            var entities_1 = [];
            attributes.forEach(function (value) {
                entities_1.push(new _this.types[relation](value));
            });
            this.set(relation, entities_1);
        }
        else {
            this.set(relation, new this.types[relation](attributes));
        }
    };
    return RelationBag;
}(Bag_1.Bag));
exports.RelationBag = RelationBag;
