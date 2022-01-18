import connecton from "./connect_db.js"; 

// Загружаем данные в DB с помощью асинхронной функции
connecton(async function(collection) {
  let result = await collection.insertOne({
    'test' : 'hello_world!'
  })
  return result; 
})
