import connecton from "./connect_db.js"; 
//import Database from "./db_class.js";

//const usersDatabase = new Database('users_list');

const user = {
  'name' : 'Vasya',
  'password' : 1234,
  'trips' : [
    {
      'hasCreated': true,
      'isActive' : false,
      'startDate' : '2022.01.10',
      'endDate' : '2022.01.14',
      'resort' : 'resortId' // ?
    },
    {
      'hasCreated': false,
      'isActive' : true,
      'startDate' : '2022.01.22',
      'endDate' : '2022.01.28',
      'resort' : 'resortId' // ?
    }
  ],
  'feedback' : [
    {
      'feedbackId': 'feedbackId', 
      'text': 'sometext',
      'resort': 'resortId'
    }
  ]
}
/*
const res = await usersDatabase.uploadOne(user);
console.log(res);
*/
// Загружаем данные в DB с помощью асинхронной функции
connecton(async function(collection) {
  let result = await collection.insertOne(user);
  let id = await result.insertedId.toString();
  return result; 
})
