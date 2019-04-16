"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var Controller_1 = __importDefault(require("./Controller"));
var router = express.Router();
router
    .get('/:id', Controller_1.default.getById)
    .get('/', Controller_1.default.get)
    .post('/', Controller_1.default.post)
    .put('/', Controller_1.default.put)
    .delete('/:id', Controller_1.default.delete);
exports.default = router;
