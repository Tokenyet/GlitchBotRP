"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var router = require('express').Router();
var express_1 = __importDefault(require("express"));
var superagent_1 = __importDefault(require("superagent"));
var router = express_1.default.Router();
var auth_1 = __importDefault(require("../auth"));
var error_1 = __importDefault(require("../error"));
var success_1 = __importDefault(require("../success"));
var user_1 = __importDefault(require("../../models/user"));
var guard_1 = __importDefault(require("../guard"));
var twitch_1 = __importDefault(require("../../utilities/twitch"));
// users // 註冊為觀眾帳號或登入取代之前資訊
router.post('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, response, err_1, twitchData, userData, user, err_2, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    console.log(body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, superagent_1.default.get("https://api.twitch.tv/helix/users")
                            .set("Authorization", "Bearer " + body.token)];
                case 2:
                    response = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, res.status(404).json(error_1.default.ErrorResponse(error_1.default.Errors.USER_NOT_FOUND_ERROR.name))];
                case 4:
                    twitchData = response.body;
                    if (twitchData.data.length == 0)
                        return [2 /*return*/, res.status(500).json(error_1.default.ErrorResponse(error_1.default.Errors.USER_NOT_FOUND_ERROR.name, "0??"))];
                    userData = twitchData.data[0];
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, user_1.default.findOne({ email: userData.email }).exec()];
                case 6:
                    user = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_2 = _a.sent();
                    return [2 /*return*/, res.status(500).json(error_1.default.ErrorResponse(error_1.default.Errors.INTERNAL_ERROR.name, err_2.toString()))];
                case 8:
                    if (user == null)
                        user = new user_1.default();
                    user.twitchId = parseInt(userData.id);
                    user.email = userData.email;
                    user.name = userData.login;
                    user.displayName = userData.display_name;
                    user.profileImage = userData.profile_image_url;
                    user.permission = "audience" /* audience */;
                    user.isRequested = false;
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, user.save()];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    err_3 = _a.sent();
                    console.log(err_3.toString());
                    return [2 /*return*/, res.status(500).json(error_1.default.ErrorResponse(error_1.default.Errors.INTERNAL_ERROR.name, err_3.toString()))];
                case 12: return [2 /*return*/, res.status(200).json(user.toAuthJSON())];
            }
        });
    });
});
// 取得新 User
router.get('/', auth_1.default.required, function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var request, payload, id, user, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    request = req;
                    payload = (_a = request) === null || _a === void 0 ? void 0 : _a.payload;
                    id = payload.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, user_1.default.findById(id).exec()];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _b.sent();
                    return [2 /*return*/, res.status(500).json(error_1.default.ErrorResponse(error_1.default.Errors.INTERNAL_ERROR.name, err_4.toString()))];
                case 4: return [2 /*return*/, res.status(200).json(user.toAuthJSON())];
            }
        });
    });
});
// 申請審核
router.post('/apply', auth_1.default.required, function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var request, payload, id, user, err_5, err_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    request = req;
                    payload = (_a = request) === null || _a === void 0 ? void 0 : _a.payload;
                    id = payload.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, user_1.default.findById(id).exec()];
                case 2:
                    user = (_b.sent());
                    return [3 /*break*/, 4];
                case 3:
                    err_5 = _b.sent();
                    return [2 /*return*/, res.status(500).json(error_1.default.ErrorResponse(error_1.default.Errors.INTERNAL_ERROR.name, err_5.toString()))];
                case 4:
                    user.isRequested = true;
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, user.save()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_6 = _b.sent();
                    return [2 /*return*/, res.status(500).json(error_1.default.ErrorResponse(error_1.default.Errors.INTERNAL_ERROR.name, err_6.toString()))];
                case 8: return [2 /*return*/, res.status(200).json(success_1.default.SuccessResponse(success_1.default.Successes.NORMAL_SUCCESS.name))];
            }
        });
    });
});
// 取得等待審核 users
router.get('/apply', auth_1.default.required, guard_1.default.manager, function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var request, payload, id, queries, users, err_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    request = req;
                    payload = (_a = request) === null || _a === void 0 ? void 0 : _a.payload;
                    id = payload.id;
                    queries = request.query;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, user_1.default.find({ permission: "audience" /* audience */, isRequested: true }).skip(queries.page * 10).limit(10).exec()];
                case 2:
                    users = (_b.sent());
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _b.sent();
                    return [2 /*return*/, res.status(500).json(error_1.default.ErrorResponse(error_1.default.Errors.INTERNAL_ERROR.name, err_7.toString()))];
                case 4: return [2 /*return*/, res.status(200).json(users.map(function (user) { return user.toGuestJson(); }))];
            }
        });
    });
});
// 驗證審核通過
router.post('/apply/confirm', auth_1.default.required, guard_1.default.manager, function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var request, payload, id, confirmId, user, err_8, confirmer, err_9, err_10;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    request = req;
                    payload = (_a = request) === null || _a === void 0 ? void 0 : _a.payload;
                    id = payload.id;
                    confirmId = request.body.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, user_1.default.findById(id).exec()];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_8 = _b.sent();
                    return [2 /*return*/, res.status(500).json(error_1.default.ErrorResponse(error_1.default.Errors.INTERNAL_ERROR.name, err_8.toString()))];
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, user_1.default.findById(confirmId).exec()];
                case 5:
                    confirmer = (_b.sent());
                    return [3 /*break*/, 7];
                case 6:
                    err_9 = _b.sent();
                    return [2 /*return*/, res.status(500).json(error_1.default.ErrorResponse(error_1.default.Errors.INTERNAL_ERROR.name, err_9.toString()))];
                case 7:
                    confirmer.isRequested = false;
                    confirmer.permission = "streamer" /* streamer */;
                    _b.label = 8;
                case 8:
                    _b.trys.push([8, 11, , 12]);
                    return [4 /*yield*/, twitch_1.default.join(confirmer.name)];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, confirmer.save()];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 11:
                    err_10 = _b.sent();
                    return [2 /*return*/, res.status(500).json(error_1.default.ErrorResponse(error_1.default.Errors.INTERNAL_ERROR.name, err_10.toString()))];
                case 12: return [2 /*return*/, res.status(200).json(success_1.default.SuccessResponse(success_1.default.Successes.NORMAL_SUCCESS.name))];
            }
        });
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map