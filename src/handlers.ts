import { Request } from "express";
import { app, database } from "./app";
import { createMongoRequest } from "./requestCreator";

async function makeQuery(collectionName: string, query: object) {
  const collection = database.collection(collectionName);
  const result = collection.find(query);
  return result.toArray();
}

// получение запроса на список всех курортов
app.get('/resorts', async function(req: Express.Request, res: Express.Response): Promise<void> {
  let query = req.query;
  let result = await makeQuery("resorts_list", query);
  let json = JSON.stringify(result);
  res.json(json);
});

// получение POST запроса на курорты с фильтрами в body
app.post('/resorts', async function(req: Express.Request, res: Express.Response): Promise<void> {
  let request = req.body;
  let mongoQuery = createMongoRequest(request);
  let result = await makeQuery("resorts_list", mongoQuery);
  let json = JSON.stringify(result);
  res.json(json);
});