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
exports.__esModule = true;
var express = require("express");
var mongodb_1 = require("mongodb");
var app = express();
app.use(express.json());
var password = 'AXg5xAfbQAHwWMV';
var databaseName = 'rs_clone';
var uri = "mongodb+srv://rsclone:".concat(password, "@cluster0.vzj91.mongodb.net/").concat(databaseName, "?retryWrites=true&w=majority");
var client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var database;
var port = 3000;
// Подлючаемся к датабазе и запускаем сервер 
client.connect(function (err) {
    if (err)
        throw err;
    database = client.db('rs_clone');
    app.listen(port, function () {
        console.log("Example app listening on port ".concat(port, "!"));
    });
});
function makeQuery(collectionName, query) {
    return __awaiter(this, void 0, void 0, function () {
        var collection, result;
        return __generator(this, function (_a) {
            collection = database.collection(collectionName);
            result = collection.find(query);
            return [2 /*return*/, result.toArray()];
        });
    });
}
// получение запроса на список курортов
app.get('/resorts', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, result, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('========= ЗАПРОС =========');
                    query = req.query;
                    console.log(query);
                    return [4 /*yield*/, makeQuery("resorts_list", query)];
                case 1:
                    result = _a.sent();
                    json = JSON.stringify(result);
                    res.send("\u0417\u0430\u043F\u0440\u043E\u0448\u0435\u043D \u0441\u043F\u0438\u0441\u043E\u043A \u043A\u0443\u0440\u043E\u0440\u0442\u043E\u0432! \n            \u041E\u0442\u0432\u0435\u0442: ".concat(json));
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/resorts', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, result, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('========= ЗАПРОС =========');
                    console.log("POST \u0437\u0430\u043F\u0440\u043E\u0441: ".concat(req));
                    query = req.body;
                    console.log(query);
                    return [4 /*yield*/, makeQuery("resorts_list", query)];
                case 1:
                    result = _a.sent();
                    json = JSON.stringify(result);
                    //res.send("Запрошен список курортов! Ответ:");
                    res.status(200);
                    res.json(json);
                    return [2 /*return*/];
            }
        });
    });
});
