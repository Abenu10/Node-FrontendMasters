import * as dotenv from 
'dotenv'
dotenv.config();
import config from './config';

import app from './server';

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log('hello on port 3001');
// });
app.listen(config.port, () => {
  console.log(`hello on http://localhost:${config.port}`);
});