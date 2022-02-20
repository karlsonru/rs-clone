import * as express from 'express';
import helmet from 'helmet';
import * as cors from 'cors';

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

app.use(cors());
     
export default app;