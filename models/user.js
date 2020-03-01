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
var ts_mongoose_1 = require("ts-mongoose");
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// var jwt = require('jsonwebtoken');
var config_1 = __importDefault(require("../config"));
//var secret = require('../config').secret;
var secret = config_1.default.secret;
var permissions = [
    "audience" /* audience */,
    "streamer" /* streamer */,
    "manager" /* manager */,
];
var InnerUserSchema = ts_mongoose_1.createSchema({
    twitchId: ts_mongoose_1.Type.number(),
    email: ts_mongoose_1.Type.string({ lowercase: true, required: true, match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/], unique: true, index: true }),
    name: ts_mongoose_1.Type.string(),
    displayName: ts_mongoose_1.Type.string(),
    profileImage: ts_mongoose_1.Type.string(),
    permission: ts_mongoose_1.Type.string({ required: true, enum: permissions, default: "audience" }),
    isRequested: ts_mongoose_1.Type.boolean({ default: false }),
    isRolePlaying: ts_mongoose_1.Type.boolean({ default: false }),
}, { timestamps: true });
// Add external schema If something wrong
// InnerCommentSchema.add(
//   createSchema({
//     author: Type.ref(Type.objectId()).to('User', UserSchema),
//     article: Type.ref(Type.objectId()).to('Article', ArticleSchema),
//   })
// );
// interface ICommentAddSchemaFields {
//   author: Types.ObjectId,
//   article: Types.ObjectId,
// }
InnerUserSchema.plugin(mongoose_unique_validator_1.default, { message: 'is already taken.' });
InnerUserSchema.methods = {
    generateJWT: function () {
        var today = new Date();
        var exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        // console.log({
        //   id: this._id,
        //   email: this.email,
        //   role: `${this.permission}`,
        //   scope: `${this.permission}`,
        //   exp: exp.getTime() / 1000,
        // });
        return jsonwebtoken_1.default.sign({
            id: this._id,
            email: this.email,
            role: "" + this.permission,
            scope: "" + this.permission,
            exp: exp.getTime() / 1000,
        }, secret);
    },
    toAuthJSON: function () {
        return {
            id: this._id,
            name: this.name,
            displayName: this.displayName,
            profileImage: this.profileImage,
            email: this.email,
            permission: this.permission,
            isRequested: this.isRequested,
            token: this.generateJWT()
        };
    },
    toGuestJson: function () {
        return {
            id: this._id,
            displayName: this.displayName,
            name: this.name,
            profileImage: this.profileImage,
            email: this.email,
            permission: this.permission,
            isRequested: this.isRequested,
        };
    },
};
var User = ts_mongoose_1.typedModel('User', InnerUserSchema, undefined, undefined, {
    getUsersByPermission: function (permission, page) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(permission.toString());
                        return [4 /*yield*/, User.find({
                                permission: permission.toString()
                            }).select("email name profileImage permission createdAt").limit(10).skip(10 * page).sort({ createdAt: -1 }).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
});
exports.UserSchema = InnerUserSchema; // Schema
exports.default = User; // Model
//# sourceMappingURL=user.js.map