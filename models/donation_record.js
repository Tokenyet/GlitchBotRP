"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_mongoose_1 = require("ts-mongoose");
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// var jwt = require('jsonwebtoken');
var config_1 = __importDefault(require("../config"));
//var secret = require('../config').secret;
var secret = config_1.default.secret;
var InnerDonationRecordSchema = ts_mongoose_1.createSchema({
    price: ts_mongoose_1.Type.number({ required: true }),
    name: ts_mongoose_1.Type.string({ required: true }),
    comment: ts_mongoose_1.Type.string(),
    title: ts_mongoose_1.Type.string(),
    ecpayTradeNo: ts_mongoose_1.Type.string(),
    isEmailed: ts_mongoose_1.Type.boolean(),
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
InnerDonationRecordSchema.plugin(mongoose_unique_validator_1.default, { message: 'is already taken.' });
InnerDonationRecordSchema.methods = {};
var DonationRecord = ts_mongoose_1.typedModel('DonationRecord', InnerDonationRecordSchema, undefined, undefined, {});
exports.DonationRecordSchema = InnerDonationRecordSchema; // Schema
exports.default = DonationRecord; // Model
//# sourceMappingURL=donation_record.js.map