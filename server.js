"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var ServerPrepared = false;
var PORT = process.env.PORT || 3050;
app_1.default.init.then(function () {
    console.log("app.express");
    app_1.default.express.listen(PORT, function () {
        ServerPrepared = true;
        console.log("Server is running in http://localhost:" + PORT);
        app_1.default.express.emit("app_started");
    });
}).catch(function (err) { return console.log(err); });
exports.default = app_1.default.express;
//# sourceMappingURL=server.js.map