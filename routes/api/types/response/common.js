"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typesafe_joi_1 = __importDefault(require("typesafe-joi"));
exports.CommonStatusSchema = typesafe_joi_1.default.object({
    code: typesafe_joi_1.default.number().required(),
    type: typesafe_joi_1.default.string().required(),
    message: typesafe_joi_1.default.any(),
});
exports.SuccessStatusSchema = exports.CommonStatusSchema.keys({
    code: typesafe_joi_1.default.number().valid(200, 204)
});
exports.ErrorStatusSchema = exports.CommonStatusSchema.keys({
    code: typesafe_joi_1.default.number().invalid(200, 204)
});
//# sourceMappingURL=common.js.map