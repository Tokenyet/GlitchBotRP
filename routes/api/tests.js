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
var config_1 = __importDefault(require("../../config"));
var superagent_1 = __importDefault(require("superagent"));
var router = express_1.default.Router();
//var auth = require('../auth');
//var config = require('../../config').default;
// var twillio = require('../../utility/twillo-service');
// var firebaseAdmin = require('../../utility/firebase-admin');
// var sendgrid = require('../../utility/send-grid');
router.get('/tests', function (req, res, next) {
    // console.log("GET /tests");
    // console.log(config);
    return res.status(200).json({
        status: config_1.default.isProduction
    });
});
router.get('/tests/loginAsTwitch', function (req, res, next) {
    return res.redirect("https://id.twitch.tv/oauth2/authorize?" +
        ("client_id=" + config_1.default.twitchClientId + "&") +
        "redirect_uri=http://localhost:3050&" +
        "response_type=token&" +
        "scope=user:read:email+channel:moderate");
});
router.get('/tests/u/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //https://api.twitch.tv/helix/users?id=53662576
                    console.log("hihi");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, superagent_1.default.get("https://api.twitch.tv/helix/users?id=" + req.params["id"])
                            .set("Authorization", "Bearer 1tynd7ws9tojyd4cvh4miubpftbe08")];
                case 2:
                    response = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1.toString());
                    return [3 /*break*/, 4];
                case 4: 
                //const twitchData = response.body as TwitchAuthResponse;
                //console.log(twitchData.data[0].email);
                return [2 /*return*/, res.status(200).send(response.text)];
            }
        });
    });
});
router.get('/tests/:token', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var accessToken, response, twitchData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accessToken = req.params["token"];
                    return [4 /*yield*/, superagent_1.default.get("https://api.twitch.tv/helix/users")
                            .set("Authorization", "Bearer " + accessToken)];
                case 1:
                    response = _a.sent();
                    twitchData = response.body;
                    console.log(twitchData.data[0].email);
                    return [2 /*return*/, res.status(200).send(response.body)];
            }
        });
    });
});
// router.get('/tests/apiForSmsMsg', async function(req, res, next) {
//     //const data = await twillio.sendSmsMessageToClient("+886918249655", "Hi, It's a test msg");
//     return res.status(200).json({
//         status: config.isProduction,
//         data: "已測試"
//     });
// });
// router.get('/tests/apiForPushNotification', function(req, res, next) {
//     // console.log("GET /tests");
//     // const developerToken = "eQ3vmiB-z_Q:APA91bFHgLXeKXS9Bz5x0nkniE-RyrTCOLK2d8kBEAt-PqJzJaMach0H_DjXS8QKII-rEXAB4RIfn31JUVJEydXfaxdlfV2vs2x_w0zWDSkVYkLrrSBKQbbdpDg4c-lDqHbu_rju7ugs";
//     // let data = firebaseAdmin.sendNotificationToDevice(developerToken, "測試推播", "測試內容文字", {
//     //     update: "123",
//     //     gogo: "456",
//     // });
//     return res.status(200).json({
//         status: config.isProduction,
//         data: "已測試"
//     });
// });
// router.get('/tests/apiForEmail', async function(req, res, next) {
//     console.log("GET /tests");
//     // const data = await sendgrid.sendEmail("tokenyete@gmail.com",
//     //     "Sending with Twilio SendGrid is Fun",
//     //     "and easy to do anywhere, even with Node.js",
//     //     "<strong>and easy to do anywhere, even with Node.js</strong>");
//     return res.status(200).json({
//         status: config.isProduction,
//         data: "已測試"
//     });
// });
module.exports = router;
//# sourceMappingURL=tests.js.map