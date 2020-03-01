"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typesafe_joi_1 = __importDefault(require("typesafe-joi"));
exports.StreamerBanRequestSchema = typesafe_joi_1.default.object({
    username: typesafe_joi_1.default.string().required(),
    reason: typesafe_joi_1.default.string(),
});
exports.StreamerUnBanRequestSchema = typesafe_joi_1.default.object({
    username: typesafe_joi_1.default.string().required(),
});
//# sourceMappingURL=streamer.js.map