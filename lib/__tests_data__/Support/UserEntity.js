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
exports.User = void 0;
var Entity_1 = require("../../Entity");
var DateTimeCast_1 = require("../../Casts/DateTimeCast");
/**
 * @class Entity
 */
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.baseRoute = function () {
        return 'users';
    };
    User.prototype.attributes = function (attributes) {
        attributes
            .create('uuid')
            .create('firstName')
            .create('lastName')
            .create('email')
            .create('createdAt');
    };
    User.prototype.relations = function (relations) {
        relations
            .create('createdBy', User)
            .create('unit', User);
    };
    User.prototype.casts = function (casts) {
        casts.set('createdAt', DateTimeCast_1.DateTimeCast);
    };
    Object.defineProperty(User.prototype, "uuid", {
        get: function () {
            return this.get('uuid');
        },
        set: function (value) {
            this.set('uuid', value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "firstName", {
        get: function () {
            return this.get('firstName');
        },
        set: function (value) {
            this.set('firstName', value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "lastName", {
        get: function () {
            return this.get('lastName');
        },
        set: function (value) {
            this.set('lastName', value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this.get('email');
        },
        set: function (value) {
            this.set('email', value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "createdBy", {
        get: function () {
            return this.get('createdBy');
        },
        set: function (value) {
            this.set('createdBy', value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "createdAt", {
        get: function () {
            return this.get('createdAt');
        },
        set: function (value) {
            this.set('createdAt', value);
        },
        enumerable: false,
        configurable: true
    });
    return User;
}(Entity_1.Entity));
exports.User = User;
