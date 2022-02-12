"use strict";
/*
country: [],
slopes: {
  total: num,
  black: boolean,
  red: boolean,
  green: boolean,
},
cabel: {
  total: boolean,
  gondola: boolean,
  bugel: boolean,
  chairlift: boolean,
},
rate: num,
*/
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
    MongoQueryCreator.prototype.createResortQuery = function (clientQuery) {
        var _a, _b;
        var mongoRequest = {
            $and: []
        };
        // если передана страна
        if (clientQuery.country) {
            // добавляем в запрос проверку ИЛИ на страну
            mongoRequest.$and.push({ $or: __spreadArray([], clientQuery.country.map(function (val) { return Object.create({}, { 'country': { value: val } }); }), true) });
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
    // запрос на создание пользователя
    MongoQueryCreator.prototype.createNewUserQuery = function (clientQuery) {
        var mongoRequest = {
            login: clientQuery.login,
            email: clientQuery.email,
            pwd: clientQuery.pwd,
            favorite: [],
            pastTrips: [],
            futureTrips: []
        };
        return mongoRequest;
    };
    return MongoQueryCreator;
}());
exports.MongoQueryCreator = MongoQueryCreator;
