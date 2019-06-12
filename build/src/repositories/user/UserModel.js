"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema_1 = __importDefault(require("./UserSchema"));
// interface IUserModel extends mongoose.Document {}
exports.User = mongoose_1.model('User', new UserSchema_1.default());
