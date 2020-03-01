"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import ecpay from '../../utilities/ecpay';
// import { EcpayResponse } from './types/response';
var donation_1 = __importDefault(require("../../models/donation"));
var donation_record_1 = __importDefault(require("../../models/donation_record"));
// import sendGrid from '@sendgrid/mail';
// import {MailData} from "@sendgrid/helpers/classes/mail";
var router = express_1.default.Router();
router.get('/top', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var queries, page, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queries = req.query;
                    page = queries.page ? queries.page : 0;
                    return [4 /*yield*/, donation_1.default.getTotalDonationLeaderBoard(page)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, res.status(200).json(data)];
            }
        });
    });
});
router.get('/latest', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var queries, page, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queries = req.query;
                    page = queries.page ? queries.page : 0;
                    return [4 /*yield*/, donation_1.default.getLatestLeaderBoard(page)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, res.status(200).json(data)];
            }
        });
    });
});
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var queries, title, comment, email, name, donation, donationRecord, price, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queries = req.query;
                    title = decodeURIComponent(queries.title);
                    comment = decodeURIComponent(queries.comment);
                    email = decodeURIComponent(queries.email);
                    name = decodeURIComponent(queries.name);
                    return [4 /*yield*/, donation_1.default.findOne({ email: email })];
                case 1:
                    donation = _a.sent();
                    donationRecord = new donation_record_1.default();
                    price = queries.price;
                    // print(donation._id);
                    console.log("id: " + donationRecord._id);
                    // const data = await ecpay.generatePaymentUrl({
                    //   donationNumber: convertRadix(donationRecord._id.toString(), 16, 40), // provided by ObjectID
                    //   price: price ? price : 30, // price from frontend
                    //   title: title ? title : "創世神權杖", // title from frontend
                    //   comment: comment ? comment : "贊助" // comment from frontend
                    // });
                    if (!donation) {
                        donation = new donation_1.default();
                        donation.email = email;
                        donation.records = [];
                    }
                    donationRecord.price = price;
                    donationRecord.title = title;
                    donationRecord.name = name;
                    donationRecord.comment = comment;
                    donation.records.push(donationRecord);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, donationRecord.save()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, donation.save()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [2 /*return*/, res.status(500).send()];
                case 6: return [2 /*return*/, res.status(200).send([])];
            }
        });
    });
});
exports.default = router;
//# sourceMappingURL=donations.js.map