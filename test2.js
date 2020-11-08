import express from 'express';
import finder from './finder.js';
import testapi from './testapi.js';

const NAME = 'David Scarratt';
const API_TEXT = 'http://localhost:9998/textToSearch'; //'https://join.reckon.com/test2/textToSearch';
const API_SUBTEXTS = 'http://localhost:9998/subTexts'; //'https://join.reckon.com/test2/subTexts';
const API_RESULTS = 'http://localhost:9998/submitResults'; //'https://join.reckon.com/test2/submitResults';

const test2 = express.Router();

test2.get('/', async (req, rsp, next) => {
  try {
    const text = (await testapi.get(API_TEXT)).text;
    const search = finder(text);
    const subtexts = (await testapi.get(API_SUBTEXTS)).subTexts;
    await testapi.post(API_RESULTS, {
      candidate: NAME,
      text,
      results: subtexts.map(s => ({
        subtext: s,
        result: search(s).map(n => n + 1).join(', ') || '<No Output>'
      }))
    });
    rsp.status(200).end();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default test2;
