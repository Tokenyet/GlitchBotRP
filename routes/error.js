"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = Object.freeze({
    // 以下為通用錯誤
    FIELD_MISSING_ERROR: { name: "FIELD_MISSING_ERROR", message: '', code: 400 },
    ROLE_ERROR: { name: "ROLE_ERROR", message: '', code: 400 },
    UNAUTHORIZED_ERROR: { name: "UNAUTHORIZED_ERROR", message: '', code: 401 },
    SCHEMA_ERROR: { name: "SCHEMA_ERROR", message: '', code: 403 },
    IP_RESTRICT_ERROR: { name: "IP_RESTRICT_ERROR", message: '', code: 403 },
    // 以上為通用錯誤
    // 以下為 User API 錯誤
    EMAIL_FORMAT_ERROR: { name: "EMAIL_FORMAT_ERROR", message: '', code: 400 },
    PASSWORD_FORMAT_ERROR: { name: "PASSWORD_FORMAT_ERROR", message: '', code: 400 },
    PHONE_FORMAT_ERROR: { name: "PHONE_FORMAT_ERROR", message: '', code: 400 },
    USER_REGISTER_FORMAT_ERROR: { name: "USER_REGISTER_FORMAT_ERROR", message: '', code: 400 },
    PHONE_UNVERIFIED_ERROR: { name: "PHONE_UNVERIFIED_ERROR", message: '', code: 400 },
    USER_NOT_FOUND_ERROR: { name: "USER_NOT_FOUND_ERROR", message: '', code: 404 },
    // 以上為 User API 錯誤
    VALIDATION_ERROR: { name: "VALIDATION_ERROR", message: 'validation is not wokring', code: 422 },
    DATABASE_VALIDATION_ERROR: { name: "ValidationError", message: 'validation is not wokring', code: 422 },
    INTERNAL_ERROR: { name: "INTERNAL_ERROR", message: 'server is busy', code: 500 },
});
exports.default = {
    Errors: Errors,
    ErrorResponse: function (errorName, customMessage) {
        var typeName = Object.keys(Errors).find(function (key) { return Errors[key].name === errorName; });
        if (typeName === undefined)
            return {
                code: 500,
                type: "ERROR_NOT_DEFINED",
                message: "ERROR_NOT_DEFINED",
            };
        var errorMsg = customMessage == null ? Errors[typeName].message : customMessage;
        var code = Errors[typeName].code;
        console.log(errorMsg);
        return {
            code: code,
            type: typeName,
            message: errorMsg,
        };
    }
};
// 偵測 throw(new Error(Errors.ABC.name));
// 可以整體 catch 後 next(err)
// 詳情可以看 user api 跟 index 的錯誤處理
// if(err.message) {
//     const error = ErrorResponse(err.message);
//     if(error.name !== "ERROR_NOT_DEFINED")
//       return res.status(error.code).json({error});
// }
//# sourceMappingURL=error.js.map