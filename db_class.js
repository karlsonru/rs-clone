export default class Database {
    constructor(client, collectionName) {
      this.collectionName = collectionName;
      this.collection = client.db('rs_clone').collection(collectionName);
    }
  
    async uploadOne(data) {
      let result = await this.collection.insertOne(data);
      return result; 
    }
  
    async uploadMany(data) {
      let result = await this.collection.insertMany(data);
      return result; 
    }
  
    async updateOne(id, data) {}
    async updateMany(ids, data) {}
  
    async removeOne(id) {}
    async removeMany(id) {}
  
  }