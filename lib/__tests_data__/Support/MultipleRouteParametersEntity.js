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
exports.MultipleRouteParametersEntity = void 0;
var Entity_1 = require("../../Entity");
/**
 * @class Entity
 */
var MultipleRouteParametersEntity = /** @class */ (function (_super) {
    __extends(MultipleRouteParametersEntity, _super);
    function MultipleRouteParametersEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultipleRouteParametersEntity.baseRoute = function () {
        return 'users/{unit}';
    };
    MultipleRouteParametersEntity.prototype.attributes = function (attributes) {
        attributes
            .create('uuid')
            .create('firstName')
            .create('lastName')
            .create('email');
    };
    Object.defineProperty(MultipleRouteParametersEntity.prototype, "uuid", {
        get: function () {
            return this.get('uuid');
        },
        set: function (value) {
            this.set('uuid', value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MultipleRouteParametersEntity.prototype, "firstName", {
        get: function () {
            return this.get('firstName');
        },
        set: function (value) {
            this.set('firstName', value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MultipleRouteParametersEntity.prototype, "lastName", {
        get: function () {
            return this.get('lastName');
        },
        set: function (value) {
            this.set('lastName', value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MultipleRouteParametersEntity.prototype, "email", {
        get: function () {
            return this.get('email');
        },
        set: function (value) {
            this.set('email', value);
        },
        enumerable: false,
        configurable: true
    });
    return MultipleRouteParametersEntity;
}(Entity_1.Entity));
exports.MultipleRouteParametersEntity = MultipleRouteParametersEntity;
