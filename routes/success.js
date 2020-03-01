"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Successes = Object.freeze({
    // 以下為通用錯誤
    NORMAL_SUCCESS: { name: "NORMAL_SUCCESS", message: '', code: 200 },
});
exports.default = {
    Successes: Successes,
    SuccessResponse: function (successName, customMessage) {
        var typeName = Object.keys(Successes).find(function (key) { return Successes[key].name === successName; });
        if (typeName === undefined)
            return {
                code: 304,
                type: "SUCCESS_NOT_DEFINED",
                message: "SUCCESS_NOT_DEFINED",
            };
        var successMsg = customMessage == null ? Successes[typeName].message : customMessage;
        var code = Successes[typeName].code;
        console.log(successMsg);
        return {
            code: code,
            type: typeName,
            message: successMsg,
        };
    }
};
// const Successes = Object.freeze({
//     // 以下為通用錯誤
//     NORMAL_SUCCESS: {name: "NORMAL_SUCCESS", message:'', code: 200},
// });
// module.exports = {
//     Successes: Successes,
//     SuccessResponse: (successName, customMessage) => {
//         let typeName = Object.keys(Successes).find(key => Successes[key].name === successName);
//         if(typeName === undefined)
//             return {
//                 code: 304,
//                 type: "SUCCESS_NOT_DEFINED",
//                 message: "SUCCESS_NOT_DEFINED",
//             }
//         let successMsg = customMessage == null ? Successes[typeName].message : customMessage;
//         let code = Successes[typeName].code;
//         console.log(successMsg);
//         return {
//             code: code,
//             type: typeName,
//             message: successMsg,
//         }
//     }
// };
// 偵測 throw(new Error(Errors.ABC.name));
// 可以整體 catch 後 next(err)
// 詳情可以看 user api 跟 index 的錯誤處理
// if(err.message) {
//     const error = ErrorResponse(err.message);
//     if(error.name !== "ERROR_NOT_DEFINED")
//       return res.status(error.code).json({error});
// }
//# sourceMappingURL=success.js.map