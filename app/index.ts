import express, { Express } from 'express';
import routes from '../config/routes';
//konek ke config db
import '../config/db';
//import ejs
// import ejs from 'ejs';

const app: Express = express();

// Atur mesin tampilan EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.get('/', (_, res) => {
  res.send('Express + TypeScript Server');
});

app.use(express.json());
app.use(routes);

export default app;
