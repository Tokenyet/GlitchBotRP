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
var express_1 = __importDefault(require("express")); // 不知道就不用寫了
var body_parser_1 = __importDefault(require("body-parser")); // 必用 Json自動Parse成 javascript obj (json/urlencoded)
var cors_1 = __importDefault(require("cors")); // 看Note 必用允許跨域存取
var errorhandler_1 = __importDefault(require("errorhandler"));
var mongoose_1 = __importDefault(require("mongoose"));
// import elastic from './utilities/elastic';
var twitch_1 = __importDefault(require("./utilities/twitch"));
var config_1 = __importDefault(require("./config"));
var routes_1 = __importDefault(require("./routes"));
var user_1 = __importDefault(require("./models/user"));
var corpse_1 = __importDefault(require("./models/corpse"));
var twitch_2 = __importDefault(require("./utilities/twitch"));
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        // this.setEnvironment();
        this.init = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("express");
                        this.express = express_1.default();
                        console.log("database");
                        return [4 /*yield*/, this.database()];
                    case 1:
                        _a.sent();
                        // console.log("elastic");
                        // await this.elastic();
                        console.log("middleware");
                        return [4 /*yield*/, this.middleware()];
                    case 2:
                        _a.sent();
                        console.log("twitch");
                        return [4 /*yield*/, this.twitch()];
                    case 3:
                        _a.sent();
                        console.log("routes");
                        this.routes();
                        resolve(this.express);
                        return [2 /*return*/];
                }
            });
        }); });
    }
    /**
     * twitch connection
     */
    App.prototype.twitch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, twitch_1.default.init({
                            onMessage: function (channel, userState, message, self) {
                                console.log("On Message: " + channel + " " + message + " " + userState.username);
                                var client = twitch_1.default.client;
                                if (self || message.length == 0 || message[0] !== '!') {
                                    return;
                                } // Ignore messages from the bot
                                var isBroadCaster = channel.replace('#', '') == userState.username;
                                var isMod = userState["user-type"] === "mod";
                                console.log(isMod + " " + isBroadCaster);
                                if (!isMod && !isBroadCaster) {
                                    return;
                                } // Not mod, bye
                                // Remove whitespace from chat message
                                var commandName = message.trim();
                                console.log("passs b");
                                var usefulChannel = channel.replace("#", "");
                                console.log("passs c");
                                if (commandName.toLocaleLowerCase() === "!startrp") {
                                    console.log("RP MODE");
                                    if (!client.isMod(channel, client.getUsername())) {
                                        client.say(channel, "\u8ACB\u7D66\u6211 Mod @" + channel.replace("#", "") + "\uFF0C\u611F\u8B1D\u60A8\uFF01");
                                        return;
                                    }
                                    else {
                                        client.say(channel, "\u958B\u59CB RP \u6A21\u5F0F\uFF01");
                                    }
                                    console.log("FIND " + usefulChannel);
                                    console.log("PERMISSION " + "streamer" /* streamer */);
                                    user_1.default.findOne({
                                        name: usefulChannel,
                                        $or: [
                                            { permission: "streamer" /* streamer */ },
                                            { permission: "manager" /* manager */ },
                                        ]
                                    }).exec(function (err, user) { return __awaiter(_this, void 0, void 0, function () {
                                        var err_1, corpses, err_2;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!user)
                                                        return [2 /*return*/];
                                                    console.log("RP ENABLED ACCOUNT");
                                                    user.isRolePlaying = true;
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, user.save()];
                                                case 2:
                                                    _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    err_1 = _a.sent();
                                                    console.log(err_1);
                                                    return [2 /*return*/];
                                                case 4:
                                                    console.log("RP ENABLED ACCOUNT SAVED");
                                                    _a.label = 5;
                                                case 5:
                                                    _a.trys.push([5, 7, , 8]);
                                                    return [4 /*yield*/, corpse_1.default.find({ banned: true }).exec()];
                                                case 6:
                                                    corpses = (_a.sent());
                                                    return [3 /*break*/, 8];
                                                case 7:
                                                    err_2 = _a.sent();
                                                    console.log(err_2);
                                                    return [2 /*return*/];
                                                case 8:
                                                    console.log("corpses: " + corpses.length);
                                                    corpses.forEach(function (corp) {
                                                        console.log("ban: " + channel + " " + corp.name + " " + corp.reason);
                                                        twitch_2.default.ban(channel, corp.name, corp.reason);
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                }
                                else if (commandName.toLocaleLowerCase() === "!endrp") {
                                    if (!client.isMod(channel, client.getUsername())) {
                                        client.say(channel, "\u8ACB\u7D66\u6211 Mod @" + channel.replace("#", "") + "\uFF0C\u611F\u8B1D\u60A8\uFF01");
                                        return;
                                    }
                                    else {
                                        client.say(channel, "\u7D50\u675F RP \u6A21\u5F0F\uFF01");
                                    }
                                    user_1.default.findOne({
                                        name: usefulChannel,
                                        $or: [
                                            { permission: "streamer" /* streamer */ },
                                            { permission: "manager" /* manager */ },
                                        ]
                                    }).exec(function (err, user) { return __awaiter(_this, void 0, void 0, function () {
                                        var err_3, corpses, err_4;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!user)
                                                        return [2 /*return*/];
                                                    user.isRolePlaying = false;
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, user.save()];
                                                case 2:
                                                    _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    err_3 = _a.sent();
                                                    console.log(err_3);
                                                    return [2 /*return*/];
                                                case 4:
                                                    corpses = [];
                                                    _a.label = 5;
                                                case 5:
                                                    _a.trys.push([5, 7, , 8]);
                                                    return [4 /*yield*/, corpse_1.default.find({ banned: true }).exec()];
                                                case 6:
                                                    corpses = _a.sent();
                                                    return [3 /*break*/, 8];
                                                case 7:
                                                    err_4 = _a.sent();
                                                    console.log(err_4);
                                                    return [2 /*return*/];
                                                case 8:
                                                    corpses.forEach(function (corp) {
                                                        twitch_2.default.unban(channel, corp.name);
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                }
                                // If the command is known, let's execute it
                                else if (commandName === "!cm") {
                                    client.say(channel, "My name is  " + client.getUsername()); // channel = #channelName ex. #newod
                                    client.say(channel, "channel is  " + channel);
                                }
                                else if (commandName === "!checkMod") {
                                    var mods = [];
                                    client.say(channel, "I am mod? : " + client.isMod("newod", client.getUsername()));
                                }
                                else {
                                    console.log("* Unknown command " + commandName);
                                }
                            },
                            onConnected: function (address, port) {
                                console.log("* Connected to " + address + ":" + port);
                                // init go to every streamer's chat, just like that
                                user_1.default.find({
                                    "$or": [{
                                            "permission": "streamer"
                                        }, {
                                            "permission": "manager"
                                        }]
                                }).exec(function (error, docs) {
                                    docs.forEach(function (doc) {
                                        console.log("join " + doc.name);
                                        twitch_2.default.join("#" + doc.name);
                                    });
                                });
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * database connection
     */
    App.prototype.database = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
                        mongoose_1.default.plugin(function (schema) { schema.set("usePushEach", true); });
                        mongoose_1.default.set('useNewUrlParser', true);
                        mongoose_1.default.set('useFindAndModify', false);
                        mongoose_1.default.set('useCreateIndex', true);
                        mongoose_1.default.set('useUnifiedTopology', true);
                        if (!config_1.default.isProduction)
                            mongoose_1.default.set('debug', true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, mongoose_1.default.connect(config_1.default.mongod)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        console.log("error: " + err_5);
                        process.exit();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
   * elastic connection
   */
    // private async elastic(): Promise<void> {
    //   await elastic.init();
    // }
    /**
     * http(s) request middleware
     */
    App.prototype.middleware = function () {
        return __awaiter(this, void 0, void 0, function () {
            var whitelist, corsOptions;
            return __generator(this, function (_a) {
                whitelist = ['http://localhost:3050', 'http://localhost:3000', "http://192.168.1.104:3000", "https://twitchrpbot.github.io"];
                corsOptions = {
                    origin: function (origin, callback) {
                        // console.log(origin); // undefined = same origin
                        console.log(origin);
                        if (!origin || whitelist.indexOf(origin) !== -1) {
                            // console.log(`${origin} is allowed by CORS`);
                            console.log("ALLOWED");
                            callback(null, true);
                        }
                        else {
                            console.log(origin + " is not allowed by CORS");
                            callback(new Error('Not allowed by CORS'));
                        }
                    }
                };
                /* apply middlewares */
                // await nextEngine.init();
                if (config_1.default.useProxy)
                    this.express.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
                this.express.use(cors_1.default(corsOptions));
                // this.express.use(require('morgan')('dev'));
                // this.express.set('views', __dirname + '/views')
                // this.express.set('view engine', 'tsx')
                // this.express.engine('tsx', require('express-react-views').createEngine());
                // this.express.set('views', __dirname + '/views')
                this.express.set('view engine', 'ejs');
                this.express.use('/public', express_1.default.static('public'));
                this.express.use(require('morgan')('dev'));
                this.express.use(body_parser_1.default.json());
                this.express.use(body_parser_1.default.urlencoded({ extended: false }));
                this.express.use(require('method-override')());
                if (!config_1.default.isProduction)
                    this.express.use(errorhandler_1.default());
                return [2 /*return*/];
            });
        });
    };
    /**
     * app environment configuration
     */
    // private setEnvironment(): void {
    //     dotenv.config({ path: '.env' });
    // }
    /**
     * API main v1 routes
     */
    App.prototype.routes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //console.log(new Date("2012/03/21 15:40:18").toLocaleDateString("zh-Hans-CN"));
                //this.express.use('/v1', await import('./routes'));
                this.express.use('/', routes_1.default);
                // this.express.use('/', (req, res) => {
                //     res.status(404).send({ error: `path doesn't exist`});
                // });
                // prevent favicon
                this.express.get('/favicon.ico', function (req, res) { return res.status(204); });
                // this.express.get('*', (req, res) => {
                //   return nextEngine.handle(req, res);
                // });
                /// catch 404 and forward to error handler
                this.express.use(function (req, res, next) {
                    var err = new Error('Not Found');
                    err.status = 404;
                    next(err);
                    console.log(req.connection.remoteAddress);
                });
                /// error handlers
                // development error handler
                // will print stacktrace
                // production error handler
                // no stacktraces leaked to user
                this.express.use(function (err, req, res, next) {
                    if (!config_1.default.isProduction)
                        console.log(err.stack);
                    var errWithStatus = err;
                    res.status(errWithStatus.status || 500);
                    res.json({ 'errors': {
                            message: err.message,
                            error: err
                        } });
                });
                return [2 /*return*/];
            });
        });
    };
    return App;
}());
exports.default = new App();
//# sourceMappingURL=app.js.map