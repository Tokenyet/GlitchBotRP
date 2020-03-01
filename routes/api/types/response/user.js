"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typesafe_joi_1 = __importDefault(require("typesafe-joi"));
exports.UserResponseSchema = typesafe_joi_1.default.object({
    id: typesafe_joi_1.default.string().required(),
    email: typesafe_joi_1.default.string().required(),
    name: typesafe_joi_1.default.string().required(),
    displayName: typesafe_joi_1.default.string(),
    profileImage: typesafe_joi_1.default.string(),
    permission: typesafe_joi_1.default.string().required(),
    isRequested: typesafe_joi_1.default.boolean(),
    token: typesafe_joi_1.default.string().required(),
});
exports.GuestUserResponseSchema = exports.UserResponseSchema.forbiddenKeys('token');
//# sourceMappingURL=user.js.map