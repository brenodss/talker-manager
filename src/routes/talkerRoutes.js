const express = require('express');
const tokenValidation = require('../middleWares/tokenValidation');
const checkTalkerName = require('../middleWares/checkTalkerName');
const checkTalkerAge = require('../middleWares/checkTalkerAge');
const talk = require('../middleWares/checkTalkerEvent');
const rate = require('../middleWares/checkRate');
const { parseContent, writePeople } = require('./utils/readFile');

const route = express.Router();

route.get('/search?', tokenValidation, (req, res) => {
  const { q: searchedName } = req.query;
  const findTalkerByName = parseContent().filter((talker) => talker.name.includes(searchedName));

  if (!searchedName) return res.status(200).send(parseContent);
  if (!findTalkerByName) return res.status(200).send([]);
  
  res.status(200).send(findTalkerByName);
});

route.get('/', (req, res) => 
  // const completePath = join('/src');
   res.status(200).send(parseContent()));

route.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkerPerson = parseContent().find((dataBaseID) => dataBaseID.id === Number(id));
  if (!talkerPerson) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).send(talkerPerson);
});

route.put('/:id', tokenValidation, checkTalkerName, checkTalkerAge, talk, rate,
 async (req, res) => {
  const { body: person } = req;
  const { id: paramID } = req.params;

  const filterPerson = parseContent().filter((talker) => Number(talker.id) !== Number(paramID));
  const updatedPerson = { id: Number(paramID), ...person };
  const updatedPeople = [...filterPerson, updatedPerson];

  writePeople(updatedPeople);

  res.status(200).send(updatedPerson);
});

route.delete('/:id', tokenValidation, (req, res) => {
  const { id: paramID } = req.params;

  const filterPerson = parseContent().filter((talker) => Number(talker.id) !== Number(paramID));
  writePeople(filterPerson);
  res.status(204).send();
});

module.exports = route;