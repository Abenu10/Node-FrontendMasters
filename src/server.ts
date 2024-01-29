import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import {protect} from './modules/auth';
import {createNewUser} from './handlers/user';
import {signin} from './handlers/user';

const app = express();

// const customLogger = (message) => (req, res, next) => {
//   console.log(`hello from ${message}`);
//   next();
// };

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(customLogger('morgan'));

// app.use((req, res, next) => {
//   req.shhh_secret = 'doggy';
//   next();
// });
app.get('/', (req, res) => {
  console.log('hello from express');
  res.status(200);
  res.json({message: 'hello'});
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

export default app;
