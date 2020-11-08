import express from 'express';
import divItem from './divitem.js';
import testapi from './testapi.js';

const API_RANGEINFO = 'http://localhost:9998/rangeInfo'; // 'https://join.reckon.com/test1/rangeInfo';
const API_DIVISORINFO = 'http://localhost:9998/divisorInfo'; // 'https://join.reckon.com/test1/divisorInfo';

const test1 = express.Router();

test1.get('/', async (req, rsp, next) => {
  try {
    const bounds = await testapi.get(API_RANGEINFO);
    const config = (await testapi.get(API_DIVISORINFO)).outputDetails;
    const divisors = config.map(i => divItem(i.divisor, i.output));
    const output = [];
    for (let i = bounds.lower; i <= bounds.upper; ++i) {
      output.push(divisors.reduce((l, f) => f(i, l), `${i}: `));
    }
    rsp.send(output.join('\n'));
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default test1;
