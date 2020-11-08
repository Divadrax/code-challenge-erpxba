import express from 'express';
import finder from './finder.js';
import testapi from './testapi.js';

const NAME = 'David Scarratt';
const API_BASE = 'https://join.reckon.com/test2'; // 'http://localhost:9998';
const API_TEXT = `${API_BASE}/textToSearch`;
const API_SUBTEXTS = `${API_BASE}/subTexts`;
const API_RESULTS = `${API_BASE}/submitResults`;

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
