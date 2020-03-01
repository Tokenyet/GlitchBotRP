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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_mongoose_1 = require("ts-mongoose");
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// var jwt = require('jsonwebtoken');
var config_1 = __importDefault(require("../config"));
var donation_record_1 = __importStar(require("./donation_record"));
//var secret = require('../config').secret;
var secret = config_1.default.secret;
var InnerDonationSchema = ts_mongoose_1.createSchema({
    email: ts_mongoose_1.Type.string({ lowercase: true, required: true, match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/], unique: true, index: true }),
    records: ts_mongoose_1.Type.array().of(ts_mongoose_1.Type.ref(ts_mongoose_1.Type.objectId()).to('DonationRecord', donation_record_1.DonationRecordSchema)),
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
InnerDonationSchema.plugin(mongoose_unique_validator_1.default, { message: 'is already taken.' });
// interface IDonationInstanceMethod { // for full ide&typescript supported with mongoose
//   setPassword(password: string): void
//   validPassword(password: string): boolean
//   generateJWT(): string
//   toAuthJSON(): {
//     id: string, name: string, nickname: string,
//     email: string, summary?: string, image: string,
//     sharePoint?: number, strivePoint?: number, responseCount?: number,
//     articleCount?: number, token: string
//   },
//   toGuestJSON(): {
//     id: string, name: string, nickname: string,
//     email: string, summary?: string, image: string,
//     sharePoint?: number, strivePoint?: number, responseCount?: number,
//     articleCount?: number
//   },
//   isFavorited(articleId: string): boolean
//   favorite(articleId: string): Promise<void>
//   unfavorite(articleId: string): Promise<void>
//   /** article favorite, arthor point++, trigger on post, favorite */
//   syncSharePoint(): Promise<void>
//   /** one comment, one point trigger on comment */
//   syncStrivePointAndResponseCount(): Promise<void> 
//   /** count from article trigger on post delete */
//   syncArticleCount(): Promise<void>
//   /** same as strivePoint trigger on comment */
//   // syncResponseCount(): Promise<void>
// }
// InnerDonationSchema.methods = {
//   // this: IDonationInstanceMethodType
//   setPassword: function(this: IDonationInstanceMethodType, password: string) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//   },
//   validPassword: function(this: IDonationInstanceMethodType, password: string) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//     return this.hash === hash;
//   },
//   generateJWT: function(this: IDonationInstanceMethodType) {
//     var today = new Date();
//     var exp = new Date(today);
//     exp.setDate(today.getDate() + 60);
//     return jwt.sign({
//       id: this._id,
//       email: this.email,
//       role: "user",
//       scope: "user:read user:write",
//       exp: exp.getTime() / 1000,
//     }, secret);
//   },
//   toAuthJSON: function(this: IDonationInstanceMethodType): {
//     id: string, name: string,
//     nickname: string, email: string, summary?: string, image: string,
//     sharePoint?: number, strivePoint?: number, responseCount?: number,
//     articleCount?: number, token: string
//   } {
//     return {
//       id: this._id,
//       name: this.name,
//       nickname: this.nickname,
//       email: this.email,
//       summary: this.summary,
//       image: this.image,
//       sharePoint: this.sharePoint || 0, // article favorite, arthor point++ // trigger on post, favorite
//       strivePoint: this.strivePoint || 0, // one comment, one point  // trigger on comment
//       responseCount: this.responseCount || 0, // same as strivePoint // trigger on comment
//       articleCount: this.articleCount || 0, // count from article // trigger on post
//       token: this.generateJWT()
//     };
//   },
//   toGuestJSON: function(this: IDonationInstanceMethodType): {
//     id: string, name: string,
//     nickname: string, email: string, summary?: string, image: string,
//     sharePoint?: number, strivePoint?: number, responseCount?: number,
//     articleCount?: number
//   } {
//     return {
//       id: this._id,
//       name: this.name,
//       nickname: this.nickname,
//       email: this.email,
//       summary: this.summary,
//       image: this.image,
//       sharePoint: this.sharePoint || 0,
//       strivePoint: this.strivePoint || 0,
//       responseCount: this.responseCount || 0,
//       articleCount: this.articleCount || 0
//     };
//   },
//   isFavorited: function(this: IDonationInstanceMethodType, articleId: string): boolean{
//     return this.favorites.some(function(favoriteId){
//       return favoriteId.toString() === articleId.toString();
//     });
//   },
//   favorite: async function(this: IDonationInstanceMethodType, articleId: string): Promise<void>{
//     if(this.favorites.indexOf(Types.ObjectId(articleId)) === -1){
//       this.favorites.push(Types.ObjectId(articleId));
//     }
//     await this.save();
//     return;
//   },
//   unfavorite: async function(this: IDonationInstanceMethodType, articleId: string): Promise<void>{
//     // this.favorites.remove(articleId);
//     this.favorites.splice(this.favorites.indexOf(Types.ObjectId(articleId)), 1);
//     await this.save();
//     return;
//   },
//   /** article favorite, arthor point++, trigger on post, favorite */
//   syncSharePoint: async function(this: IDonationInstanceMethodType) : Promise<void>{
//     const datas = await Article.aggregate([
//       { "$match": { "author": Types.ObjectId(this.id)} },
//       {
//         "$group" : {
//           "_id": 0,
//           "total": {
//             "$sum" : "$favoriteCount"
//           }
//         }
//       }
//     ]);
//     this.sharePoint = datas[0]?.total || 0;
//     await this.save();
//     return;
//   },
//   /** one comment, one point trigger on comment */
//   syncStrivePointAndResponseCount: async function(this: IDonationInstanceMethodType) : Promise<void>{
//     let count:number = await Comment.count({"author": {"$in": this.id}}).exec();
//     this.strivePoint = count;
//     this.responseCount = count;
//     await this.save();
//     return;
//   },
//   /** count from article trigger on post delete */
//   syncArticleCount: async function(this: IDonationInstanceMethodType) : Promise<void>{
//     this.articleCount = await Article.count({"author": {"$in": this.id}}).exec();
//     await this.save();
//     return;
//   },
//   /** same as strivePoint trigger on comment */
//   // syncResponseCount: async function(this: IDonationInstanceMethodType) : Promise<void>{
//   // },
// }
// export interface IDonationPayload {
//   id: string,
//   email: string,
//   role: string,
//   scope: string,
//   exp: number,
// }
var DonationLeanHelper = {
    SimpleJson: function (id, image, nickname, name, sharePoint, strivePoint) {
        return {
            image: this.image || image,
            id: this._id || this.id || id,
            name: this.name || name,
            nickname: this.nickname || nickname,
            sharePoint: this.sharePoint || sharePoint || 0,
            strivePoint: this.strivePoint || strivePoint || 0,
        };
    }
};
var Donation = ts_mongoose_1.typedModel('Donation', InnerDonationSchema, undefined, undefined, {
    findByIdWithSimpleJson: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = DonationLeanHelper.SimpleJson).call;
                        return [4 /*yield*/, this.findById(id).lean().exec()];
                    case 1: 
                    // console.log("Lean:");
                    // console.log(await this.findById(id).lean().exec());
                    // console.log("PostLean:");
                    // console.log(DonationLeanHelper.SimpleJson.call(await this.findById(id).lean().exec()));
                    return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    },
    getTotalDonationLeaderBoard: function (page) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.aggregate([
                            {
                                $lookup: {
                                    from: "donationrecords",
                                    localField: "records",
                                    foreignField: "_id",
                                    as: "records"
                                }
                            },
                            {
                                $unwind: {
                                    path: "$records"
                                }
                            },
                            { $group: {
                                    _id: "$email",
                                    names: { $push: "$records.name" },
                                    total: { $sum: "$records.price" }
                                }
                            },
                            {
                                $sort: {
                                    total: -1
                                }
                            },
                            {
                                $limit: page * 10 + 10
                            },
                            {
                                $skip: page * 10
                            },
                            {
                                $project: {
                                    _id: false,
                                    email: "$_id",
                                    names: "$names",
                                    total: "$total"
                                }
                            },
                        ])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    getLatestLeaderBoard: function (page) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, donation_record_1.default.find({}).select("name price comment title createdAt").limit(10).skip(10 * page).sort({ createdAt: -1 })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
});
exports.DonationSchema = InnerDonationSchema; // Schema
exports.default = Donation; // Model
//# sourceMappingURL=donation.js.map