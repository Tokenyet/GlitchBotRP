"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import Err from '../error';
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./users"));
var streamer_1 = __importDefault(require("./streamer"));
// import donationsApi from './donations';
var error_1 = __importDefault(require("../error"));
var Errors = error_1.default.Errors;
var ErrorResponse = error_1.default.ErrorResponse;
var router = express_1.default.Router();
router.use('/', require('./tests')); // Test server is up
// router.use('/donations', donationsApi); // Test server is up
// router.use('/', require('./users')); // Test server is up
router.use('/users', users_1.default);
router.use('/streamers', streamer_1.default);
router.use(function (err, req, res, next) {
    console.log("aaa");
    console.log(err);
    if (err.name === 'ValidationError') {
        console.log("ValidationError Error!");
        ///console.log(err);
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function (errors, key) {
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        });
    }
    if (err.name) {
        if (err.name === 'UnauthorizedError')
            return res.status(Errors.UNAUTHORIZED_ERROR.code).json(ErrorResponse(Errors.UNAUTHORIZED_ERROR.name));
        else {
            var error = ErrorResponse(err.name);
            if (err.name !== "ERROR_NOT_DEFINED")
                return res.status(error.code).json(ErrorResponse(error.type, err.name));
        }
    }
    if (err.message) {
        var error = ErrorResponse(err.message);
        if (err.name !== "ERROR_NOT_DEFINED")
            return res.status(error.code).json(ErrorResponse(error.type, err.nessage));
    }
    console.log("bbb");
    return next(err);
});
exports.default = router;
//# sourceMappingURL=index.js.map