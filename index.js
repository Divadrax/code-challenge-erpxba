import express from 'express';
import test2 from './test2.js';

const app = express();
app.use('/test2', test2);
app.listen(9999);
