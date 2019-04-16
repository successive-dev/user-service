"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var VersionableSchema = /** @class */ (function (_super) {
    __extends(VersionableSchema, _super);
    function VersionableSchema(userSchema) {
        var _this = this;
        var VersionSchema = Object.assign({
            createdAt: {
                default: new Date(),
                required: true,
                type: Date,
            },
            deletedAt: {
                required: false,
                type: Date,
            },
            originalId: {
                required: true,
                type: String,
            },
        }, userSchema);
        _this = _super.call(this, VersionSchema) || this;
        return _this;
    }
    return VersionableSchema;
}(mongoose_1.Schema));
exports.default = VersionableSchema;
