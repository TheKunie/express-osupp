const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('static'));

const apiKey = '860d6158e141567d52f57e44f687bdc3ec359a2e';

app.get('/express_backend', (req, res) => {
  res.send({ express: 'Express backend connected to React' });
  console.log('connected');
});

app.post('/osu', (req, res, next) => {
  axios({
    method: 'get',
    url: 'https://osu.ppy.sh/api/get_user',
    params: {
      k: apiKey,
      u: req.body.search,
    },
  }).then((response) => {
    res.json(response.data[0]);
    console.log(response.data[0]);
  });
  //res.json({ hey: 'received' });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
