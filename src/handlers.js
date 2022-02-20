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
            var result, query, e_1, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        query = req.query;
                        return [4 /*yield*/, databaseRequests.findMany("resorts_list", query)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_1 = _a.sent();
                        result = e_1.name;
                        res.status(500);
                        return [3 /*break*/, 4];
                    case 3:
                        json = JSON.stringify(result);
                        res.json(json);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    // обработка POST запроса на курорты с фильтрами в body
    app.post('/resorts', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, request, mongoQuery, e_2, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        request = req.body;
                        mongoQuery = queryCreator.findResortQuery(request);
                        return [4 /*yield*/, databaseRequests.findMany("resorts_list", mongoQuery)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_2 = _a.sent();
                        result = e_2.name;
                        res.status(500);
                        return [3 /*break*/, 4];
                    case 3:
                        json = JSON.stringify(result);
                        res.json(json);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    // Обработка POST запроса с авторизацией для пользователя 
    app.post('/user', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, request, userQuery, e_3, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        request = req.body;
                        // проверяем обязательные поля - login / email && pwd
                        if (!(request.login || request.email) || !request.pwd) {
                            res.status(400);
                            throw "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u044B \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0432 \u0437\u0430\u043F\u0440\u043E\u0441\u0435";
                        }
                        userQuery = queryCreator.findUserQuery(request);
                        return [4 /*yield*/, databaseRequests.findOne("users_list", userQuery)];
                    case 1:
                        result = _a.sent();
                        // если пользователь не найден 
                        if (!result) {
                            res.status(404);
                            throw 'Пользователь не найден';
                        }
                        // проверяем пароль у найденного пользователя и переданный в запросе
                        if (request.pwd !== result.pwd) {
                            res.status(403);
                            throw 'Неверный пароль';
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        e_3 = _a.sent();
                        result = e_3.name || e_3;
                        if (res.statusCode == 200)
                            res.status(500);
                        return [3 /*break*/, 4];
                    case 3:
                        json = JSON.stringify(result);
                        res.json(json);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    // Обработка запроса на создание нового пользователя
    app.put('/user', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, request, userQuery, isNotUnique, mongoQuery, e_4, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        request = req.body;
                        userQuery = queryCreator.findUserQuery(request);
                        return [4 /*yield*/, databaseRequests.findOne("users_list", userQuery)];
                    case 1:
                        isNotUnique = _a.sent();
                        if (isNotUnique) {
                            res.status(403);
                            throw 'Пользователем с таким логином или адресом электронной почты уже зарегистрирован';
                        }
                        mongoQuery = queryCreator.createNewUserQuery(request);
                        return [4 /*yield*/, databaseRequests.uploadOne("users_list", mongoQuery)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_4 = _a.sent();
                        result = e_4.name || e_4;
                        if (res.statusCode == 200)
                            res.status(500);
                        return [3 /*break*/, 5];
                    case 4:
                        json = JSON.stringify(result);
                        res.json(json);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    });
    // запрос списка поездок с фильтрами
    app.post('/trips', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, request, mongoQuery, e_5, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        request = req.body;
                        mongoQuery = queryCreator.findTripQuery(request);
                        return [4 /*yield*/, databaseRequests.findMany("trips", mongoQuery)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_5 = _a.sent();
                        result = e_5.name;
                        res.status(500);
                        return [3 /*break*/, 4];
                    case 3:
                        json = JSON.stringify(result);
                        res.json(json);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    // создание новой поездки
    app.put('/trips', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, request, isNotUnique, mongoQuery, e_6, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        request = req.body;
                        return [4 /*yield*/, databaseRequests.findOne("trips", { trip_name: request.trip_name, resort_name: request.resort_name })];
                    case 1:
                        isNotUnique = _a.sent();
                        if (isNotUnique) {
                            res.status(403);
                            throw 'Поездка с таким названием на этот курорт уже существует';
                        }
                        mongoQuery = queryCreator.createNewTripQuery(request);
                        return [4 /*yield*/, databaseRequests.uploadOne("trips", mongoQuery)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_6 = _a.sent();
                        result = e_6.name || e_6;
                        if (res.statusCode == 200)
                            res.status(500);
                        return [3 /*break*/, 5];
                    case 4:
                        json = JSON.stringify(result);
                        res.json(json);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    });
    // удаление созданной поездки 
    app["delete"]('/trips', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, request, trip, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        request = req.body;
                        // проверяем переданы ли обязательные параметры
                        if (!request.requested_user_id || !request.trip_id) {
                            res.status(400);
                            throw 'Не указаны обязательные параметры запроса';
                        }
                        return [4 /*yield*/, databaseRequests.findOne('trips', { '_id': request.trip_id })];
                    case 1:
                        trip = _a.sent();
                        // сообщаем если не найдена
                        if (!trip) {
                            res.status(404);
                            throw 'Поездка не найдена';
                        }
                        // если удалять поездку решил не создававший её пользователь - сообщаем об ошибке
                        if (trip.started_user_id != request.requested_user_id) {
                            res.status(403);
                            throw 'Недостаточно прав для запрошенного действия';
                        }
                        return [4 /*yield*/, databaseRequests.deleteOne("trips", request.trip_id)];
                    case 2:
                        // если всё ок - удаляем запись из БД и возвращаем результат 
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_7 = _a.sent();
                        result = e_7.name || e_7;
                        if (res.statusCode == 200)
                            res.status(500);
                        return [3 /*break*/, 5];
                    case 4:
                        result = JSON.stringify(result);
                        res.json(result);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    });
}
exports["default"] = Handlers;
