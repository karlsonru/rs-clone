import { app } from "./app";

async function makeQuery(collectionName, query) {
  const collection = database.collection(collectionName);
  const result = collection.find(query);
  return result.toArray();
}

// получение запроса на список всех курортов
app.get('/resorts', async function(req, res) {
  let query = req.query;
  let result = await makeQuery("resorts_list", query);
  let json = JSON.stringify(result);
  res.json(json);
});

// получение POST запроса на конкретные курорты
app.post('/resorts', async function(req, res) {
  let query = req.body;
  let result = await makeQuery("resorts_list", query);
  let json = JSON.stringify(result);
  res.json(json);
});