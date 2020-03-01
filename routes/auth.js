"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_jwt_1 = __importDefault(require("express-jwt"));
//var secret = require('../config').secret;
var config_1 = __importDefault(require("../config"));
var secret = config_1.default.secret;
function getTokenFromHeader(req) {
    // console.log(req.headers);
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
        if (token === "")
            return null;
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
var auth = {
    required: express_jwt_1.default({
        secret: secret,
        userProperty: 'payload',
        getToken: getTokenFromHeader
    }),
    optional: express_jwt_1.default({
        secret: secret,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
};
// module.exports = auth;
exports.default = auth;
//# sourceMappingURL=auth.js.map