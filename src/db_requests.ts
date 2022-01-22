import { MongoClient } from "mongodb"; 

// интерфес класса соединения с коллекцией
interface IDatabase {
  database: MongoClient["db"];
}

// Добавить интерфейс user
// Добавить интерфейс курорта

export default class DatabaseRequests implements IDatabase {
  private database;

  constructor(database: MongoClient["db"]) {
    this.database = database;
  }
  
  // добавляем одну сущеность в базу данных
  async uploadOne(collectionName: string, data: object) {
    let result = await this.database[collectionName].insertOne(data);
    return result; 
  }
  
  
  async findOne(query: object) {
    let result = await this.database[collectionName].findOne(query);
    return result;
  }

  async findMany(query: object) {
    let result = this.collection.find(query);
    let collection = await result;
    return collection.toArray();
  }

  async updateOne(id, data) {}

  async removeOne(id) {}
}