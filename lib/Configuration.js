"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
var Bag_1 = require("./Bag/Bag");
exports.Configuration = {
    configuration: new Bag_1.Bag(),
    load: function (configuration) {
        this.configuration.load(configuration);
    },
    all: function () {
        return this.configuration.all();
    },
    // @todo dot notation
    get: function (key, fallback) {
        if (fallback === void 0) { fallback = null; }
        return this.configuration.get(key, fallback);
    },
    // @todo dot notation
    set: function (key, value) {
        this.configuration.set(key, value);
        return this.configuration;
    },
    has: function (key) {
        return this.configuration.has(key);
    }
};
