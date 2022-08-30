const checkTalkerRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate === undefined) {
    return res.status(400).send({
      message: 'O campo "rate" é obrigatório',
    });
  }

  if (!(talk.rate >= 1 && talk.rate <= 5)) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = checkTalkerRate;