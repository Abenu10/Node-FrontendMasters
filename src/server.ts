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
app.get('/', (req, res, next) => {
  // console.log('hello from express');
  // res.status(200);
  // res.json({message: 'hello'});

  // throw new Error('hello');
  setTimeout(() => {
    next(new Error('hello'));
  }, 1);
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({message: 'unauthorized'});
  } else if (err.type === 'input') {
    res.status(400).json({message: 'invalid input'});
  } else {
    res.status(500).json({message: 'oops, thats on us'});
  }
});
export default app;
