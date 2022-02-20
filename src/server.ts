import app from './app';
import Handlers from './handlers';
import { MongoClient } from 'mongodb';

const password: string = 'AXg5xAfbQAHwWMV';
const databaseName: string = 'rs_clone';

const uri = `mongodb+srv://rsclone:${password}@cluster0.vzj91.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const client: MongoClient = new MongoClient(uri);
const port = process.env.PORT;

// устанавливаем одно соединение
client.connect(async function(err) {
  if(err) throw err;

  // подключаемся к базе
  const database = await client.db('rs_clone');
    
  // вешаем обработчики на запросы
  new Handlers(app, database);

  
  // разворачиваем сервер http
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  }); 
})
