"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var envVars = process.env;
var configuration = Object.freeze({
    apiToken: envVars.API_TOKEN || 'any',
    mongo_url: envVars.MONGO_URL || 'any',
    node_env: envVars.NODE_ENV || 'any',
    port: envVars.PORT || 'any',
    secret: envVars.SECRET || 'any',
    url: envVars.URL || 'any',
});
exports.default = configuration;
