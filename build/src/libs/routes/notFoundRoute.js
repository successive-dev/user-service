"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res, next) {
    next({
        error: 'Not Found',
        message: 'Route not found',
        status: 404,
    });
});
