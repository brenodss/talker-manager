const express = require('express');
const bodyParser = require('body-parser');
// const checkTalkers = require('./middleWares/checkTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const fs = require('fs');
// const { join } = require('path');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  // const completePath = join('/src');
  const content = fs.readFileSync('./src/talker.json', 'utf-8');
  const parseContent = JSON.parse(content);
  res.status(200).send(content);
});

app.listen(PORT, () => {
  console.log('Online');
});
