const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

const checkTalkerEvent = (req, res, next) => {
  const { talk } = req.body;
  const dateFormat = talk && dateRegex.test(talk.watchedAt);

  if (!talk) {
    return res.status(400).send({ message: 'O campo "talk" é obrigatório' });
  } if (!talk.watchedAt) {
    return res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
  } if (!dateFormat) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = checkTalkerEvent;