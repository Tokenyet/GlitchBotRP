"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typesafe_joi_1 = __importDefault(require("typesafe-joi"));
var user_1 = require("./user");
exports.StreamerCorpseSchema = typesafe_joi_1.default.object({
    id: typesafe_joi_1.default.string().required(),
    name: typesafe_joi_1.default.string().required(),
    reason: typesafe_joi_1.default.string(),
    dominator: user_1.GuestUserResponseSchema,
    banned: typesafe_joi_1.default.boolean().required(),
});
//# sourceMappingURL=streamer.js.map