import express from 'express';
import test1 from './test1.js';
import test2 from './test2.js';

const port = process.env.RECKONPORT || 9999;
const app = express();
app.use('/', test1);
app.use('/test2', test2);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
