import express from 'express';

const app = express();
app.use(express.json());

app.get('/textToSearch', (req, rsp, next) => {
  console.log('request for text');
  if (Math.random() < 0.1) {
    next(new Error('not this time'));
  } else {
    rsp.json({
      'text': 'Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!'
    });
  }
});

app.get('/subTexts', (req, rsp, next) => {
  console.log('request for subtexts');
  if (Math.random() < 0.1) {
    next(new Error('not this time'));
  } else {
    rsp.json({
      'subTexts': [
        'Peter',
        'peter',
        'Pick',
        'Pi',
        'Z'
      ]
    });
  }
});

app.post('/submitResults', (req, rsp, next) => {
  console.log('post results');
  if (Math.random() < 0.1) {
    next(new Error('not this time'));
  } else {
    console.log(JSON.stringify(req.body, null, 2));
    rsp.end();
  }
});

app.listen(9998);
