"use strict";
import { MongoClient } from 'mongodb';

const password = 'AXg5xAfbQAHwWMV';
const databaseName = 'rs_clone';

const uri = `mongodb+srv://rsclone:${password}@cluster0.vzj91.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function makeQuery(collectionName: string, query: object) {
  let result;
  try {
    await client.connect();
    const database = client.db('rs_clone');
    const collection = database.collection(collectionName);

    result = await collection.find(query);
  } finally {
    await client.close();
  }
  return result;
}

export default makeQuery;