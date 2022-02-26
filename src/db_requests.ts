import { Db, DbOptions, MongoClient, ObjectId } from "mongodb"; 
//const MongoCli = new MongoClient();

// интерфес класса соединения с коллекцией
// Добавить интерфейс user
// Добавить интерфейс курорта

interface IQuery {
  '_id'?: string;
  'trip_name'?: string;
  'resort_name'?: string;
  'login'?: string; 
  'email'?: string; 
  'pwd'?: string; 
  '$and'?: any[];
}

interface IDatabaseRequests {
  uploadOne(collectionName: string, data: IQuery): Promise<{}>;
  findOne(collectionName: string, query: IQuery): Promise<{}>;
  findMany(collectionName: string, query: IQuery): Promise<{}>;
  updateOne(collectionName: string, id: string, query: IQuery): Promise<void>;
  deleteOne(collectionName: string, id: string): Promise<{}>;
}

interface IDatabaseResponse {
  'started_user_id'?: string;
}

// класс для управления запросами к базе данных
export default class DatabaseRequests implements IDatabaseRequests {
  constructor(db) {
    this.database = db;
  }
  
  // добавляем одну сущеность в базу данных
  async uploadOne(collectionName: string, data: IQuery): Promise<IDatabaseResponse> {
    let result = await this.database.collection(collectionName).insertOne(data);
    return result; 
  }
  
  // ищем одну запись в коллекции
  async findOne(collectionName: string, query: IQuery): Promise<IDatabaseResponse> {
    // если передан внутренний ID, то преобразуем в запрос по внутреннему ID базы данных
    if (query._id) query = {'_id': ObjectId(query._id) };

    let result = await this.database.collection(collectionName).findOne(query);
    return result;
  }

  // ищем все записи по запросу в коллекции
  async findMany(collectionName: string, query: IQuery): Promise<IDatabaseResponse> {
    const result = this.database.collection(collectionName).find(query);
    return result.toArray();
  }

  async updateOne(collectionName: string, id: string, query: IQuery) {};

  async deleteOne(collectionName: string, id: string): Promise<IDatabaseResponse> {
    const result = this.database.collection(collectionName).deleteOne( {'_id': ObjectId(id) } );
    return result;
  }
}