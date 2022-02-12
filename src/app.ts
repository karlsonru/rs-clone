import * as express from 'express';
import helmet from 'helmet';

const app = express();
/*
app.use(  
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
    }
  })
);
*/
app.use(  
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(express.json());  
  
export default app;