"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typesafe_joi_1 = __importDefault(require("typesafe-joi"));
// {"data":[{"id":"53662576","login":"newod","display_name":"newod","type":"","broadcaster_type":"","description":"Play for fun,Enjoy it.","profile_image_url":"https://static-cdn.jtvnw.net/jtv_user_pictures/newod-profile_image-24c897f34e11e473-300x300.jpeg","offline_image_url":"","view_count":192,"email":"terryden5566@yahoo.com.tw"}]}
exports.TwitchAuthUserDataSchema = typesafe_joi_1.default.object({
    id: typesafe_joi_1.default.string().required(),
    login: typesafe_joi_1.default.string().required(),
    display_name: typesafe_joi_1.default.string().required(),
    type: typesafe_joi_1.default.string().required(),
    broadcaster_type: typesafe_joi_1.default.string().required(),
    description: typesafe_joi_1.default.string().required(),
    profile_image_url: typesafe_joi_1.default.string().required(),
    offline_image_url: typesafe_joi_1.default.string().required(),
    view_count: typesafe_joi_1.default.number().required(),
    email: typesafe_joi_1.default.string().required(),
});
exports.TwitchAuthDataSchema = typesafe_joi_1.default.object({
    data: typesafe_joi_1.default.array().items(exports.TwitchAuthUserDataSchema),
});
//# sourceMappingURL=twitch_auth_response.js.map