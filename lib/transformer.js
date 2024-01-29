"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var requireTransformer = function (path, config) {
    var transformer = require(path).default || require(path);
    if (!transformer.process && !transformer.processAsync) {
        if (transformer.createTransformer) {
            return transformer.createTransformer(config || {});
        }
        return null;
    }
    return transformer;
};
var flatTransformers = function (transformers) {
    var containers = [];
    for (var _i = 0, transformers_1 = transformers; _i < transformers_1.length; _i++) {
        var transformer = transformers_1[_i];
        var transformerModule = void 0;
        if (typeof transformer === 'string') {
            transformerModule = requireTransformer(transformer, {});
            if (!transformerModule) {
                console.error("cant load " + transformer + " as a transformer, so skip it");
                break;
            }
        }
        else if (Array.isArray(transformer)) {
            transformerModule = __assign(__assign({}, requireTransformer(transformer[0], transformer[1])), { transformerConfig: transformer[1] });
        }
        containers.push(transformerModule);
    }
    return containers;
};
var createTransformer = function () {
    var flattenTransformers = null;
    var getFlattenTransformers = function (options) {
        if (flattenTransformers) {
            return flattenTransformers;
        }
        flattenTransformers = flatTransformers(options.transformerConfig.transformers);
        return flattenTransformers;
    };
    var constructOptions = function (options, config) {
        return __assign(__assign({}, options), { transformerConfig: config });
    };
    return {
        canInstrument: true,
        getCacheKey: function (sourceText, sourcePath, options) {
            var transformers = getFlattenTransformers(options);
            return transformers.reduce(function (res, transformer) {
                var _a;
                return (res +
                    ((_a = transformer.getCacheKey) === null || _a === void 0 ? void 0 : _a.call(transformer, sourceText, sourcePath, constructOptions(options, transformer.transformerConfig))) || '');
            }, '');
        },
        process: function (sourceText, sourcePath, options) {
            var transformers = getFlattenTransformers(options);
            return transformers.reduce(function (res, transformer) {
                var _a;
                return (_a = transformer.process) === null || _a === void 0 ? void 0 : _a.call(transformer, res.code ? res.code : res, sourcePath, constructOptions(options, transformer.transformerConfig));
            }, { code: sourceText });
        },
        getCacheKeyAsync: function (sourceText, sourcePath, options) { return __awaiter(void 0, void 0, void 0, function () {
            var transformers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transformers = getFlattenTransformers(options);
                        return [4 /*yield*/, transformers.reduce(function (res, transformer) { return __awaiter(void 0, void 0, void 0, function () {
                                var _a;
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _a = res;
                                            return [4 /*yield*/, ((_b = transformer.getCacheKeyAsync) === null || _b === void 0 ? void 0 : _b.call(transformer, sourceText, sourcePath, constructOptions(options, transformer.transformerConfig)))];
                                        case 1: return [2 /*return*/, (_a +
                                                (_c.sent()) || '')];
                                    }
                                });
                            }); }, '')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        processAsync: function (sourceText, sourcePath, options) { return __awaiter(void 0, void 0, void 0, function () {
            var transformers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transformers = getFlattenTransformers(options);
                        return [4 /*yield*/, transformers.reduce(function (res, transformer) { return __awaiter(void 0, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, ((_a = transformer.process) === null || _a === void 0 ? void 0 : _a.call(transformer, res.code ? res.code : res, sourcePath, constructOptions(options, transformer.transformerConfig)))];
                                        case 1: return [2 /*return*/, _b.sent()];
                                    }
                                });
                            }); }, { code: sourceText })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
    };
};
exports.default = createTransformer();
