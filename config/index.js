"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    isProduction: process.env.NODE_ENV === 'production',
    secret: process.env.SECRET || 'twitch_bot_secret',
    host: process.env.HOSTNAME || 'http://localhost:3020',
    //mongod: process.env.MONGODB_URI || "mongodb://localhost/minecraft_scepter_forum", // 27017
    mongod: process.env.MONGODB_URI || "mongodb://localhost/twitch_bot_secret",
    useProxy: process.env.USE_PROXY,
    isUseCluster: process.env.IS_USE_CLUSER,
    twitchClientId: "ji2x3mhdh53rl5ezek9j6xamsolds4",
    botToken: process.env.BOT_TOKEN,
    botName: process.env.BOT_USERNAME,
    botAdminChannelName: process.env.ADMIN_CHANNEL_NAME
};
exports.default = config; // 相等於沒有使用變數
// 用 es5 require 需要.default, 如果是 function 要.default()
//# sourceMappingURL=index.js.map