import * as express from 'express';
import { MongoClient } from 'mongodb';
const app = express();
app.use(express.json());

const password = 'AXg5xAfbQAHwWMV';
const databaseName = 'rs_clone';

const uri = `mongodb+srv://rsclone:${password}@cluster0.vzj91.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let database;
const port = 3000;

// Подлючаемся к датабазе и запускаем сервер 
client.connect(function(err) {
  if(err) throw err;

  database = client.db('rs_clone');

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
});

export { app, database };