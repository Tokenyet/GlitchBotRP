"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typesafe_joi_1 = __importDefault(require("typesafe-joi"));
exports.UserRegisterRequestSchema = typesafe_joi_1.default.object({
    token: typesafe_joi_1.default.string().required(),
});
exports.UserApplyConfirmRequestSchema = typesafe_joi_1.default.object({
    id: typesafe_joi_1.default.string().required(),
});
//# sourceMappingURL=user.js.map