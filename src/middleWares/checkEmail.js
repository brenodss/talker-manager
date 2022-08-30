const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const correctFormat = RegExp(/^\S+@\S+\.\S+$/).test(email);

 if (!email) {
    return res.status(400).send(
      { message: 'O campo "email" é obrigatório' },
      );
  } 
  if (!correctFormat) {
    return res.status(400).send(
      { message: 'O "email" deve ter o formato "email@email.com"' },
      );
  } 

  next();
};

module.exports = checkEmail;