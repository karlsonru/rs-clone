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
var requestCreator_1 = require("./requestCreator");
var db_requests_1 = require("./db_requests");
var queryCreator = new requestCreator_1.MongoQueryCreator;
function Handlers(application, database) {
    var app = application;
    var databaseRequests = new db_requests_1["default"](database);
    // обработка запроса на список всех курортов
    app.get('/resorts', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = req.query;
                        return [4 /*yield*/, databaseRequests.findMany("resorts_list", query)];
                    case 1:
                        result = _a.sent();
                        json = JSON.stringify(result);
                        res.json(json);
                        return [2 /*return*/];
                }
            });
        });
    });
    // обработка POST запроса на курорты с фильтрами в body
    app.post('/resorts', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var request, mongoQuery, result, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = req.body;
                        mongoQuery = queryCreator.createResortQuery(request);
                        return [4 /*yield*/, databaseRequests.findMany("resorts_list", mongoQuery)];
                    case 1:
                        result = _a.sent();
                        json = JSON.stringify(result);
                        res.json(json);
                        return [2 /*return*/];
                }
            });
        });
    });
    // Обработка POST запроса с авторизацией для пользователя 
    app.post('/user', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var request, json_1, json_2, userQuery, result, json_3, json_4, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = req.body;
                        try {
                            // проверяем обязательные поля - login / email && pwd
                            if (!(request.login || request.email) || !request.pwd) {
                                json_1 = JSON.stringify("\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u044B \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0432 \u0437\u0430\u043F\u0440\u043E\u0441\u0435");
                                res.json(json_1);
                                return [2 /*return*/];
                            }
                        }
                        catch (e) {
                            json_2 = JSON.stringify("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441");
                            res.json(json_2);
                            return [2 /*return*/];
                        }
                        userQuery = queryCreator.findUserQuery(request);
                        return [4 /*yield*/, databaseRequests.findOne("users_list", userQuery)];
                    case 1:
                        result = _a.sent();
                        // если пользователь не найден 
                        if (!result) {
                            json_3 = JSON.stringify('Пользователь не найден');
                            res.json(json_3);
                            return [2 /*return*/];
                        }
                        // проверяем пароль у найденного пользователя и переданный в запросе
                        if (request.pwd !== result.pwd) {
                            json_4 = JSON.stringify('Неверный пароль');
                            res.json(json_4);
                            return [2 /*return*/];
                        }
                        json = JSON.stringify(result);
                        res.json(json);
                        return [2 /*return*/];
                }
            });
        });
    });
    // Обработка запроса на создание нового пользователя
    app.put('/user', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var request, userQuery, isNotUnique, json, mongoQuery, result, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = req.body;
                        userQuery = queryCreator.findUserQuery(request);
                        return [4 /*yield*/, databaseRequests.findOne("users_list", userQuery)];
                    case 1:
                        isNotUnique = _a.sent();
                        if (!isNotUnique) return [3 /*break*/, 2];
                        json = JSON.stringify('Пользователем с таким логином или адресом электронной почты уже зарегистрирован');
                        res.json(json);
                        return [3 /*break*/, 4];
                    case 2:
                        mongoQuery = queryCreator.createNewUserQuery(request);
                        return [4 /*yield*/, databaseRequests.uploadOne("users_list", mongoQuery)];
                    case 3:
                        result = _a.sent();
                        json = JSON.stringify(result);
                        res.json(json);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    // запрос списка поездок с фильтрами
    app.post('/trips', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                request = req.body;
                return [2 /*return*/];
            });
        });
    });
    // создание новой поездки
    app.put('/trips', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                request = req.body;
                return [2 /*return*/];
            });
        });
    });
}
exports["default"] = Handlers;
