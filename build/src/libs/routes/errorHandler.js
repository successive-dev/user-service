"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (err, req, res, next) {
    var error = err.error, message = err.message, status = err.status;
    res.status(status || 500).send({
        error: error || 'Not Found',
        message: message || 'error',
        status: status || 500,
        timestamp: new Date(),
    });
    next();
});
