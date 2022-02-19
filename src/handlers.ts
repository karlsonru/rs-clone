import { MongoQueryCreator } from "./requestCreator";
import DatabaseRequests from "./db_requests";

const queryCreator = new MongoQueryCreator;

export default function Handlers(application, database) {
  const app = application;
  const databaseRequests = new DatabaseRequests(database);

  // обработка запроса на список всех курортов
  app.get('/resorts', async function(req: Express.Request, res: Express.Response): Promise<void> {
    const query = req.query;
    const result = await databaseRequests.findMany("resorts_list", query);
    const json = JSON.stringify(result);
    res.json(json);
  });

  // обработка POST запроса на курорты с фильтрами в body
  app.post('/resorts', async function(req: Express.Request, res: Express.Response): Promise<void> {
    const request = req.body;
    const mongoQuery = queryCreator.createResortQuery(request);
    const result = await databaseRequests.findMany("resorts_list", mongoQuery);
    const json = JSON.stringify(result);
    res.json(json);
  });

  // Обработка POST запроса с авторизацией для пользователя 
  app.post('/user', async function(req: Express.Request, res: Express.Response): Promise<void> {
    // добавить проверку что заполнено минимум 2 поля (логин / email + pwd)

    const request = req.body;
    const result = await databaseRequests.findOne("users_list", request);
    const json = JSON.stringify(result);
    res.json(json);
  });

  // Обработка запроса на создание нового пользователя
  app.put('/user', async function(req: Express.Request, res: Express.Response): Promise<void> {
     const request = req.body;

    // проверяем, есть ли такой email / login в базе данных уже
    const validateRequest = queryCreator.checkNewUserQuery(request);
    const isNotUnique = await databaseRequests.findOne("users_list", validateRequest);

    if (isNotUnique) {
      const reply = 'Пользователем с таким логином или адресом электронной почты уже зарегистрирован';
      const json = JSON.stringify(reply);
      res.json(json);
    } else {
      const mongoQuery = queryCreator.createNewUserQuery(request);
      const result = await databaseRequests.uploadOne("users_list", mongoQuery);
      const json = JSON.stringify(result);
      res.json(json);
    }
  });
}