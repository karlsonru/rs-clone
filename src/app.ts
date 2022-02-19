import * as express from 'express';
import helmet from 'helmet';

const app = express();

app.use(express.json());

app.use(  
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],    
    }
  })
);
     
export default app;