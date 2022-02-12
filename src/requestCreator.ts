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

class MongoQueryCreator {
  // создаём запрос к курортам
  createResortQuery(clientQuery: Express.Request.query | Express.Request.body): object {
    const mongoRequest = {
      $and: [],
    };
  
    // если передана страна
    if (clientQuery.country) {
      // добавляем в запрос проверку ИЛИ на страну
      mongoRequest.$and.push(
        { $or: [...clientQuery.country.map(val => Object.create({}, {'country': {value: val}}) )] },
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

  // запрос на создание пользователя
  createNewUserQuery(clientQuery: Express.Request.query | Express.Request.body): object {
    const mongoRequest = {
      login: clientQuery.login,
      email: clientQuery.email,
      pwd: clientQuery.pwd,
      favorite: [],
      pastTrips: [],
      futureTrips: []
    } 
    return mongoRequest;
  } 
}

export { MongoQueryCreator }