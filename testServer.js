import express from 'express';

const app = express();
app.use(express.json());

function testHandler(label, action) {
  return (req, rsp, next) => {
    console.log(label);
    if (Math.random() < 0.1) {
      next(new Error('not this time'));
    } else {
      action(req, rsp);
    }
  };
}

app.get('/rangeInfo',
  testHandler('request for range info',
    (req, rsp) => rsp.json({
      lower: 1,
      upper: 100
    })));

app.get('/divisorInfo',
  testHandler('request for divisor info',
    (req, rsp) => rsp.json({
      outputDetails: [
        {
          divisor: 3,
          output: 'Boss'
        },
        {
          divisor: 5,
          output: 'Hogg'
        }
      ]
    })));

app.get('/textToSearch',
  testHandler('request for text',
    (req, rsp) => rsp.json({
      'text': 'Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!'
    })));

app.get('/subTexts',
  testHandler('request for subtexts',
  (req, rsp) => rsp.json({
    'subTexts': [
      'Peter',
      'peter',
      'Pick',
      'Pi',
      'Z'
    ]
  })));

app.post('/submitResults',
  testHandler('post results',
    (req, rsp) => {
      console.log(JSON.stringify(req.body, null, 2));
      rsp.end();
    }));

app.listen(9998);
