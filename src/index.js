const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const talkerRoute = require('./routes/talkerRoutes');

// Encrypt
// const checkTalkers = require('./middleWares/checkTalkers');
// const regex = /\b[a-z0-9]{12}\b/i;
// req.headers.authorization

const app = express();
app.use(bodyParser.json());
app.use('/talker', talkerRoute);

app.post('/login', /* checkLogin , */ (req, res) => {
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
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
