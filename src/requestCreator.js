"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.MongoQueryCreator = void 0;
var MongoQueryCreator = /** @class */ (function () {
    function MongoQueryCreator() {
    }
    // создаём запрос к курортам
    MongoQueryCreator.prototype.findResortQuery = function (clientQuery) {
        var _a, _b;
        var mongoRequest = {
            $and: []
        };
        // если передана страна
        if (clientQuery.country) {
            // добавляем в запрос проверку ИЛИ на страну
            mongoRequest.$and.push({ 'country': { $in: __spreadArray([], clientQuery.country, true) } });
        }
        // если указаны фильтры на трассы
        if (clientQuery.slopes) {
            for (var i in clientQuery.slopes) {
                // для трасс total - добавляем >= переданному значению, для определённых типов - просто их наличие 
                mongoRequest.$and.push((_a = {}, _a["cabel.".concat(i)] = { $gte: (i == 'total') ? clientQuery.slopes[i] : 0 }, _a));
            }
        }
        // если указаны фильтры на подъемники
        if (clientQuery.cabel) {
            for (var i in clientQuery.cabel) {
                // для подъемников total - добавляем >= переданному значению, для определённых типов - просто их наличие 
                mongoRequest.$and.push((_b = {}, _b["cabel.".concat(i)] = { $gte: (i == 'total') ? clientQuery.cabel[i] : 0 }, _b));
            }
        }
        // если передан рейтинг, добавляем его в запрос
        if (clientQuery.rate) {
            mongoRequest.$and.push({ rate: { $gte: clientQuery.rate } });
        }
        return mongoRequest;
    };
    // проверка на наличие дублей в базе (пользователя с таким же логином или почтой)
    MongoQueryCreator.prototype.findUserQuery = function (clientQuery) {
        var mongoRequest;
        if (clientQuery.login && clientQuery.email) {
            mongoRequest = { $or: [{ email: clientQuery.email }, { login: clientQuery.login }] };
        }
        else if (clientQuery.email) {
            mongoRequest = { email: clientQuery.email };
        }
        else if (clientQuery.login) {
            mongoRequest = { login: clientQuery.login };
        }
        // Если не удалось составить запрос
        if (!mongoRequest)
            new Error('Ошибка при создании запроса к базе данных!');
        return mongoRequest;
    };
    // запрос на создание пользователя
    MongoQueryCreator.prototype.createNewUserQuery = function (clientQuery) {
        var mongoRequest = {
            login: clientQuery.login,
            email: clientQuery.email,
            pwd: clientQuery.pwd,
            favorite: [],
            pastTrips: [],
            futureTrips: [],
            feedback: []
        };
        return mongoRequest;
    };
    MongoQueryCreator.prototype.createNewTripQuery = function (clientQuery) {
        var mongoQuery = clientQuery;
        mongoQuery.participants = [clientQuery.started_user_id];
        return mongoQuery;
    };
    MongoQueryCreator.prototype.findTripQuery = function (clientQuery) {
        var mongoRequest = {
            $and: []
        };
        // добавляем страну в запрос
        if (clientQuery.country) {
            mongoRequest.$and.push({ 'country': { $in: __spreadArray([], clientQuery.country, true) } });
        }
        // добавляем название курорта в запрос
        if (clientQuery.resort_name) {
            mongoRequest.$and.push({
                'resort_name': clientQuery.resort_name
            });
        }
        // добавляем дату начала поездки
        if (clientQuery.start_date) {
            mongoRequest.$and.push({
                'start_date': { $gte: clientQuery.start_date }
            });
        }
        // добавляем окончания поездки
        if (clientQuery.end_date) {
            mongoRequest.$and.push({
                'end_date': { $lte: clientQuery.end_date }
            });
        }
        // добавляем id создавшего пользователя
        if (clientQuery.started_user_id) {
            mongoRequest.$and.push({
                'started_user_id': clientQuery.started_user_id
            });
        }
        // добавляем имя создавшего пользователя
        if (clientQuery.started_user_name) {
            mongoRequest.$and.push({
                'started_user_name': clientQuery.started_user_name
            });
        }
        return mongoRequest;
    };
    return MongoQueryCreator;
}());
exports.MongoQueryCreator = MongoQueryCreator;
