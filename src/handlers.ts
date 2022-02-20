import { MongoQueryCreator } from "./requestCreator";
import DatabaseRequests from "./db_requests";

const queryCreator = new MongoQueryCreator;

export default function Handlers(application, database) {
  const app = application;
  const databaseRequests = new DatabaseRequests(database);

  // обработка запроса на список всех курортов
  app.get('/resorts', async function(req, res): Promise<void> {
    let result;
    try {
      const query = req.query;
      result = await databaseRequests.findMany("resorts_list", query);
    } catch(e) {
      result = e.name;
      res.status(500);
    } finally {
      const json = JSON.stringify(result);
      res.json(json);
    }
  });

  // обработка POST запроса на курорты с фильтрами в body
  app.post('/resorts', async function(req, res): Promise<void> {
    let result;
    try {
      const request = req.body;
      const mongoQuery = queryCreator.findResortQuery(request);
      result = await databaseRequests.findMany("resorts_list", mongoQuery);
    } catch(e) {
      result = e.name;
      res.status(500);
    } finally {
      const json = JSON.stringify(result);
      res.json(json);
    }
  });

  // Обработка POST запроса с авторизацией для пользователя 
  app.post('/user', async function(req, res): Promise<void> {
    let result;
    try {
      const request = req.body;
      
      // проверяем обязательные поля - login / email && pwd
      if (!(request.login || request.email) || !request.pwd) {
        res.status(400);
        throw `Не указаны обязательные параметры в запросе`;
      }

      // создаём запрос для поиска пользователя
      const userQuery = queryCreator.findUserQuery(request);
      result = await databaseRequests.findOne("users_list", userQuery);

      // если пользователь не найден 
      if (!result) {
        res.status(404);
        throw 'Пользователь не найден';
      }

      // проверяем пароль у найденного пользователя и переданный в запросе
      if (request.pwd !== result.pwd) {
        res.status(403);
        throw 'Неверный пароль';
      }
    } catch(e) {
      result = e.name || e;
      if (res.statusCode == 200) res.status(500);
    } finally {
      const json = JSON.stringify(result);
      res.json(json);
    }
  });

  // Обработка запроса на создание нового пользователя
  app.put('/user', async function(req, res): Promise<void> {
    let result;
    try {
      const request = req.body;

      // проверяем, есть ли такой email / login в базе данных уже
      const userQuery = queryCreator.findUserQuery(request);
      const isNotUnique = await databaseRequests.findOne("users_list", userQuery);
  
      if (isNotUnique) {
        res.status(403)
        throw 'Пользователем с таким логином или адресом электронной почты уже зарегистрирован';
      } 

      const mongoQuery = queryCreator.createNewUserQuery(request);
      result = await databaseRequests.uploadOne("users_list", mongoQuery);
    } catch(e) {
      result = e.name || e;
      if (res.statusCode == 200) res.status(500);
    } finally {
      const json = JSON.stringify(result);
      res.json(json);
    }
  });

  // запрос списка поездок с фильтрами
  app.post('/trips', async function(req, res): Promise<void> {
    let result;
    try {
      const request = req.body;
      const mongoQuery = queryCreator.findTripQuery(request);
      result = await databaseRequests.findMany("trips", mongoQuery);
    } catch(e) {
      result = e.name;
      res.status(500);
    } finally {
      const json = JSON.stringify(result);
      res.json(json);
    }
  });

  // создание новой поездки
  app.put('/trips', async function(req, res): Promise<void> {
    let result;
    try {
      const request = req.body;
      
      // проверяем нет ли поездки с таким именем на этот курорт
      const isNotUnique = await databaseRequests.findOne("trips", {trip_name: request.trip_name, resort_name: request.resort_name} );

      if (isNotUnique) {
        res.status(403);
        throw 'Поездка с таким названием на этот курорт уже существует';
      } 

      // добавляем по умолчанию характеристику с участниками
      let mongoQuery = queryCreator.createNewTripQuery(request);
      result = await databaseRequests.uploadOne("trips", mongoQuery);
    } catch(e) {
      result = e.name || e;
      if (res.statusCode == 200) res.status(500);
    } finally {
      const json = JSON.stringify(result);
      res.json(json);
    }
  })

  // удаление созданной поездки 
  app.delete('/trips', async function(req, res): Promise<void> {
    let result;
    try {
      const request = req.body;

      // проверяем переданы ли обязательные параметры
      if (!request.requested_user_id || !request.trip_id) {
        res.status(400);
        throw 'Не указаны обязательные параметры запроса';
      }

      // ищем саму поездку
      let trip = await databaseRequests.findOne('trips', {'_id': request.trip_id});

      // сообщаем если не найдена
      if (!trip) {
        res.status(404);
        throw 'Поездка не найдена';
      }

      // если удалять поездку решил не создававший её пользователь - сообщаем об ошибке
      if (trip.started_user_id != request.requested_user_id) {
        res.status(403);
        throw 'Недостаточно прав для запрошенного действия';
      }

      // если всё ок - удаляем запись из БД и возвращаем результат 
      result = await databaseRequests.deleteOne("trips", request.trip_id);
    } catch(e) {
      result = e.name || e;
      if (res.statusCode == 200) res.status(500);
    } finally {
      result = JSON.stringify(result);
      res.json(result);
    }
  });
}