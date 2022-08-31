const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const talkerRoute = require('./routes/talkerRoutes');
const checkPassword = require('./middleWares/checkPassword');
const checkEmail = require('./middleWares/checkEmail');
const tokenValidation = require('./middleWares/tokenValidation');
const checkTalkerName = require('./middleWares/checkTalkerName');
const checkTalkerAge = require('./middleWares/checkTalkerAge');
const talk = require('./middleWares/checkTalkerEvent');
const rate = require('./middleWares/checkRate');

const writePeople = (data) => fs.writeFileSync('./src/talker.json', JSON.stringify(data));

// Encrypt
// const checkTalkers = require('./middleWares/checkTalkers');
// const regex = /\b[a-z0-9]{12}\b/i;
// req.headers.authorization

const app = express();
app.use(bodyParser.json());
app.use('/talker', talkerRoute);

app.post('/login', checkEmail, checkPassword, (req, res) => {
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

app.post('/talker', tokenValidation, checkTalkerName, checkTalkerAge, talk, rate,
 async (req, res) => {
  const content = fs.readFileSync('./src/talker.json', 'utf-8');
  const parseContent = JSON.parse(content);
  const request = req.body;

  const nextTalker = { 
    id: parseContent.length + 1,
    ...request,
  };

  const newArray = [...parseContent, nextTalker];
  await writePeople(newArray);
  res.status(201).send(nextTalker);
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// const { join } = require('path');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
