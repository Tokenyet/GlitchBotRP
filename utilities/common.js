"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertBase(str, fromBase, toBase) {
    var DIGITS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/";
    var add = function (x, y, base) {
        var z = [];
        var n = Math.max(x.length, y.length);
        var carry = 0;
        var i = 0;
        while (i < n || carry) {
            var xi = i < x.length ? x[i] : 0;
            var yi = i < y.length ? y[i] : 0;
            var zi = carry + xi + yi;
            z.push(zi % base);
            carry = Math.floor(zi / base);
            i++;
        }
        return z;
    };
    var multiplyByNumber = function (num, x, base) {
        if (num < 0)
            return null;
        if (num == 0)
            return [];
        var result = [];
        var power = x;
        while (true) {
            num & 1 && (result = add(result, power, base));
            num = num >> 1;
            if (num === 0)
                break;
            power = add(power, power, base);
        }
        return result;
    };
    var parseToDigitsArray = function (str, base) {
        var digits = str.split('');
        var arr = [];
        for (var i = digits.length - 1; i >= 0; i--) {
            var n = DIGITS.indexOf(digits[i]);
            if (n == -1)
                return null;
            arr.push(n);
        }
        return arr;
    };
    var digits = parseToDigitsArray(str, fromBase);
    if (digits === null)
        return null;
    var outArray = [];
    var power = [1];
    for (var i = 0; i < digits.length; i++) {
        digits[i] && (outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase));
        power = multiplyByNumber(fromBase, power, toBase);
    }
    var out = '';
    for (var i = outArray.length - 1; i >= 0; i--)
        out += DIGITS[outArray[i]];
    return out;
}
exports.convertRadix = convertBase;
//# sourceMappingURL=common.js.map