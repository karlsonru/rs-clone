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
    const request = req.body;

    try {
      // проверяем обязательные поля - login / email && pwd
      if (!(request.login || request.email) || !request.pwd) {
        const json = JSON.stringify(`Не указаны обязательные параметры в запросе`);
        res.json(json);  
        return;
      }
    } catch (e) {
      const json = JSON.stringify(`Не удалось обработать запрос`);
      res.json(json);  
      return;    
    }

    // создаём запрос для поиска пользователя
    const userQuery = queryCreator.findUserQuery(request);
    const result = await databaseRequests.findOne("users_list", userQuery);

    // если пользователь не найден 
    if (!result) {
      const json = JSON.stringify('Пользователь не найден');
      res.json(json);  
      return;
    }

    // проверяем пароль у найденного пользователя и переданный в запросе
    if (request.pwd !== result.pwd) {
      const json = JSON.stringify('Неверный пароль');
      res.json(json);  
      return;
    }

    const json = JSON.stringify(result);
    res.json(json);
  });

  // Обработка запроса на создание нового пользователя
  app.put('/user', async function(req: Express.Request, res: Express.Response): Promise<void> {
    const request = req.body;

    // проверяем, есть ли такой email / login в базе данных уже
    const userQuery = queryCreator.findUserQuery(request);
    const isNotUnique = await databaseRequests.findOne("users_list", userQuery);

    if (isNotUnique) {
      const json = JSON.stringify('Пользователем с таким логином или адресом электронной почты уже зарегистрирован');
      res.json(json);
    } else {
      const mongoQuery = queryCreator.createNewUserQuery(request);
      const result = await databaseRequests.uploadOne("users_list", mongoQuery);
      const json = JSON.stringify(result);
      res.json(json);
    }
  });

  // запрос списка поездок с фильтрами
  app.post('/trips', async function(req: Express.Request, res: Express.Response): Promise<void> {
    const request = req.body;
  });

  // создание новой поездки
  app.put('/trips', async function(req: Express.Request, res: Express.Response): Promise<void> {
    const request = req.body;
  })
}