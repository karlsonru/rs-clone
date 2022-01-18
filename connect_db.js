"use strict";
import { MongoClient } from 'mongodb';
// const { MongoClient } = require('mongodb');

const password = 'AXg5xAfbQAHwWMV';
const databaseName = 'rs_clone';

const uri = `mongodb+srv://rsclone:${password}@cluster0.vzj91.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Экспортируем подключеие к базе, принимаем в качестве аргумента асинхронную функцию-коллбек 
// - что нужно сдеать во время подключения
function connectDB(callback) {
  client.connect(func => {
    const collection = client.db("rs_clone").collection("resorts_list");
    
    callback(collection)
    .then(function(result) {
      console.log(result)
      client.close();
    })
  })
}

export default connectDB;