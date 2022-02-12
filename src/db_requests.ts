import { MongoClient } from "mongodb"; 

// интерфес класса соединения с коллекцией
interface IDatabase {
  database: MongoClient["db"];
}

// Добавить интерфейс user
// Добавить интерфейс курорта

// класс для управления запросами к базе данных
export default class DatabaseRequests {
  constructor(db: MongoClient["db"]) {
    this.database = db;
  }
  
  // добавляем одну сущеность в базу данных
  async uploadOne(collectionName: string, data: object) {
    let result = await this.database.collection(collectionName).insertOne(data);
    return result; 
  }
  
  
  // ищем одну запись в коллекции
  async findOne(collectionName: string, query: object) {
    let result = await this.database.collection(collectionName).findOne(query);
    return result;
  }

  // ищем все записи по запросу в коллекции
  async findMany(collectionName: string, query: object) {
    const result = this.database.collection(collectionName).find(query);
    return result.toArray();
  }

  async updateOne(id, data) {}

  async removeOne(id) {}
}