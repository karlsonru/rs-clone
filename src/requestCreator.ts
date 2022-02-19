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

import { request } from "express";

class MongoQueryCreator {
  // создаём запрос к курортам
  findResortQuery(clientQuery: Express.Request.query | Express.Request.body): object {
    const mongoRequest = {
      $and: [],
    };
  
    // если передана страна
    if (clientQuery.country) {
      // добавляем в запрос проверку ИЛИ на страну
      mongoRequest.$and.push(
        { 'country': { $in: [...clientQuery.country] }} 
    )}
  
    // если указаны фильтры на трассы
    if (clientQuery.slopes) {
      for (let i in clientQuery.slopes) {
        // для трасс total - добавляем >= переданному значению, для определённых типов - просто их наличие 
        mongoRequest.$and.push(
          { [`cabel.${i}`]: {$gte: (i == 'total') ? clientQuery.slopes[i] : 0} }
        );
      }
    }
    
    // если указаны фильтры на подъемники
    if (clientQuery.cabel) {
      for (let i in clientQuery.cabel) {
        // для подъемников total - добавляем >= переданному значению, для определённых типов - просто их наличие 
        mongoRequest.$and.push(
          { [`cabel.${i}`]: {$gte: (i == 'total') ? clientQuery.cabel[i] : 0} }
        );
      }
    }
  
    // если передан рейтинг, добавляем его в запрос
    if (clientQuery.rate) {
      mongoRequest.$and.push( {rate: {$gte: clientQuery.rate}} )
    }
   
    return mongoRequest;
  }

  // проверка на наличие дублей в базе (пользователя с таким же логином или почтой)
  findUserQuery(clientQuery: Express.Request.query | Express.Request.body): object {
    let mongoRequest;

    if (clientQuery.login && clientQuery.email) {
      mongoRequest = {$or: [ {email: clientQuery.email }, {login: clientQuery.login} ]};
    } else if (clientQuery.email) {
      mongoRequest = {email: clientQuery.email};
    } else if (clientQuery.login) {
      mongoRequest = {login: clientQuery.login};
    } 

    // Если не удалось составить запрос
    if (!mongoRequest) new Error('Ошибка при создании запроса к базе данных!');

    return mongoRequest;
  }
  
  // запрос на создание пользователя
  createNewUserQuery(clientQuery: Express.Request.query | Express.Request.body): object {
    const mongoRequest = {
      login: clientQuery.login,
      email: clientQuery.email,
      pwd: clientQuery.pwd,
      favorite: [],
      pastTrips: [],
      futureTrips: [],
      feedback: []
    } 
    return mongoRequest;
  } 

  createNewTripQuery(clientQuery: Express.Request.query | Express.Request.body): object {
    const mongoQuery = clientQuery;
    mongoQuery.participants = [clientQuery.started_user_id];
    
    return mongoQuery;
  }

  findTripQuery(clientQuery: Express.Request.query | Express.Request.body): object {
    const mongoRequest = {
      $and: [],
    };

    // добавляем страну в запрос
    if (clientQuery.country) {
      mongoRequest.$and.push(
        {'country': { $in: [...clientQuery.country] }}
      )
    }

    // добавляем название курорта в запрос
    if (clientQuery.resort_name) {
      mongoRequest.$and.push({
        'resort_name': clientQuery.resort_name
      })
    }

    // добавляем дату начала поездки
    if (clientQuery.start_date) {
      mongoRequest.$and.push({
          'start_date': {$gte: clientQuery.start_date}
      })
    }

    // добавляем окончания поездки
    if (clientQuery.end_date) {
      mongoRequest.$and.push({
        'end_date': {$lte: clientQuery.end_date}
      })
    }
    
    // добавляем id создавшего пользователя
    if (clientQuery.started_user_id) {
      mongoRequest.$and.push({
        'started_user_id': clientQuery.started_user_id
      })
    }

    // добавляем имя создавшего пользователя
    if (clientQuery.started_user_name) {
      mongoRequest.$and.push({
        'started_user_name': clientQuery.started_user_name
      })
    }
    
    return mongoRequest;
  }
}

export { MongoQueryCreator }