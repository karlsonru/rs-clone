import { MongoQueryCreator } from "./requestCreator";
import DatabaseRequests from "./db_requests";

const queryCreator = new MongoQueryCreator;

export default function Handlers(application, database) {
  const app = application;
  const databaseRequests = new DatabaseRequests(database);

  // обработка запроса на список всех курортов
  app.get('/resorts', async function(req: Express.Request, res: Express.Response): Promise<void> {
    let query = req.query;
    let result = await databaseRequests.findMany("resorts_list", query);
    let json = JSON.stringify(result);
    res.json(json);
  });

  // обработка POST запроса на курорты с фильтрами в body
  app.post('/resorts', async function(req: Express.Request, res: Express.Response): Promise<void> {
    let request = req.body;
    let mongoQuery = queryCreator.createResortQuery(request);
    let result = await databaseRequests.findMany("resorts_list", mongoQuery);
    let json = JSON.stringify(result);
    res.json(json);
  });

  // Обработка POST запроса с авторизацией для пользователя 
  app.post('/user', async function(req: Express.Request, res: Express.Response): Promise<void> {

  });

  // Обработка запроса на создание нового пользователя
  app.put('/user', async function(req: Express.Request, res: Express.Response): Promise<void> {
    let request = req.body;
    let result = await databaseRequests.uploadOne("users_list", request);
    let json = JSON.stringify(result);
    res.json(json);
  });
}