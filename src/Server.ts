import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { IConfig } from './config';
import { userRouter } from './controllers';
import { db, errorHandler, notFoundRoute } from './libs';
import { authenticationRequired } from './middlewares';

export default class Server {
  public app: express.Express;

  constructor(private config: IConfig) {
    this.app = express();
  }

  public bootstrap() {
    this.initBodyParser();
    this.setupRoutes();
    return this;
  }

  public initBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  public setupRoutes() {
    this.app.use(cors());
    this.app.use(
      session({
        resave: true,
        saveUninitialized: false,
        secret: 'nfdjkwqbufncjwdnxcqfnixvmebquudbvcjnaowdgfuebvjkee'
      }),
    );
    this.app.get('/', (_, res) => {
      res.send({ value: 'I am root' });
    });
    this.app.get('/api/secure', authenticationRequired, (req, res) => {
      console.log('Secure api hit');
      res.send('Congrats u have hit a secure end point');
    });
    this.app.use('/api/user', userRouter);
    this.app.use(notFoundRoute);
    this.app.use(errorHandler);
  }

  public async run() {
    try {
      const {
        app,
        config: { port },
      } = this;

      app.listen(port, () => {
        console.log(`App is listening on port ${port}!`);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
