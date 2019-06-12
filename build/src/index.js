"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var Server_1 = __importDefault(require("./Server"));
var server = new Server_1.default(config_1.configuration);
server.bootstrap().run();
