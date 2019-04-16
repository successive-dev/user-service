"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var VersionableRepository = /** @class */ (function () {
    function VersionableRepository(userModel) {
        this.model = userModel;
    }
    VersionableRepository.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var originalId, id, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        originalId = this.genObjectId();
                        id = originalId;
                        Object.assign(data, { _id: id, originalId: originalId });
                        return [4 /*yield*/, this.model.create(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_1 = _a.sent();
                        throw new Error("Can't create document");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VersionableRepository.prototype.readOne = function (originalId) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({
                                deletedAt: { $exists: false },
                                originalId: originalId,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_2 = _a.sent();
                        throw new Error('No document found');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VersionableRepository.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find({ deletedAt: { $exists: false } })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_3 = _a.sent();
                        throw new Error('No document found');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VersionableRepository.prototype.genObjectId = function () {
        return mongoose_1.Types.ObjectId();
    };
    VersionableRepository.prototype.updateDeletedAt = function (originalId) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.updateOne({ originalId: originalId, deletedAt: { $exists: false } }, { $set: { deletedAt: new Date() } })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error("Can't delete the document");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VersionableRepository.prototype.update = function (originalId, dataToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, previousDoc, newDoc, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.readOne(originalId)];
                    case 1:
                        doc = _a.sent();
                        previousDoc = doc.toObject();
                        delete previousDoc._id;
                        delete previousDoc.createdAt;
                        newDoc = Object.assign(previousDoc, dataToUpdate);
                        // Invalidating the previous data/document
                        return [4 /*yield*/, this.updateDeletedAt(originalId)];
                    case 2:
                        // Invalidating the previous data/document
                        _a.sent();
                        newDoc.createdAt = new Date();
                        newDoc._id = this.genObjectId();
                        return [4 /*yield*/, this.model.create(newDoc)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error('Unable to properly update document');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    VersionableRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateDeletedAt(id)];
            });
        });
    };
    VersionableRepository.prototype.findByQuery = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var limit, skip, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        limit = data.limit, skip = data.skip;
                        delete data.limit;
                        delete data.skip;
                        return [4 /*yield*/, this.model.find(data, undefined, { limit: limit, skip: skip })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_3 = _a.sent();
                        throw new Error('Unable to find document by query');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return VersionableRepository;
}());
exports.default = VersionableRepository;
