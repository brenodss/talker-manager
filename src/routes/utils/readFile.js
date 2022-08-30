const fs = require('fs');

const parseContent = () => {
  const content = fs.readFileSync('./src/talker.json', 'utf-8');
  const parse = JSON.parse(content);
  console.log(parse);
  return parse;
};

const writePeople = (data) => fs.writeFileSync('./src/talker.json', JSON.stringify(data));

module.exports = { parseContent, writePeople };
