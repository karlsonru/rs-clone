import { MongoClient, ObjectId } from "mongodb"; 
//const MongoCli = new MongoClient();

// интерфес класса соединения с коллекцией
// Добавить интерфейс user
// Добавить интерфейс курорта

// класс для управления запросами к базе данных
export default class DatabaseRequests {
  constructor(db) {
    this.database = db;
  }
  
  // добавляем одну сущеность в базу данных
  async uploadOne(collectionName: string, data: object) {
    let result = await this.database.collection(collectionName).insertOne(data);
    return result; 
  }
  
  
  // ищем одну запись в коллекции
  async findOne(collectionName: string, query: object) {
    // если передан внутренний ID, то преобразуем в запрос по внутреннему ID базы данных
    if (query._id) query = {'_id': ObjectId(query._id) };

    let result = await this.database.collection(collectionName).findOne(query);
    return result;
  }

  // ищем все записи по запросу в коллекции
  async findMany(collectionName: string, query: object) {
    const result = this.database.collection(collectionName).find(query);
    return result.toArray();
  }

  async updateOne(id, data) {}

  async deleteOne(collectionName: string, id: string) {
    const result = this.database.collection(collectionName).deleteOne( {'_id': ObjectId(id) } );
    return result;
  }
}