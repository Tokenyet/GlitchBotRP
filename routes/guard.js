"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var guard = require('express-jwt-permissions')({
    requestProperty: 'payload',
    permissionsProperty: 'scope',
});
var guarder = {
    audience: guard.check("" + "audience" /* audience */),
    streamer: guard.check([
        ["" + "streamer" /* streamer */],
        ["" + "manager" /* manager */]
    ]),
    manager: guard.check("" + "manager" /* manager */),
};
exports.default = guarder;
//# sourceMappingURL=guard.js.map