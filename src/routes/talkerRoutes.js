const express = require('express');
const fs = require('fs');

const content = fs.readFileSync('./src/talker.json', 'utf-8');
const route = express.Router();
const parseContent = JSON.parse(content);

route.get('/', (req, res) => 
  // const completePath = join('/src');
   res.status(200).send(parseContent));

route.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkerPerson = parseContent.find((dataBaseID) => dataBaseID.id === Number(id));
  if (!talkerPerson) return res.status(200).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).send({ msg: talkerPerson });
});

module.exports = route;