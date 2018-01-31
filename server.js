const express = require(`express`);
const server = express();
const bodyParser = require('body-parser');
const buzzWords = [];
let totalScore = 0;
const buzzWordsRoute = require(`./routes/buzzWords.js`);
const { indexOfBuzzWord } = require(`./helperFunctions.js`);
const success = { 'success': true };
const failure = { 'success': false };

const PORT = process.env.PORT || 8080;

server.locals.buzzWords = buzzWords;

server.use(bodyParser.urlencoded({ extended: true }));

server.use(`/buzzWords`, buzzWordsRoute);

server.get(`/`, (req, res) => {
  return res.sendFile(__dirname + `/public/index.html`);
});

server.get(`/reset`, (req, res) => {
  buzzWords.length = 0;
  totalScore = 0;
  return res.json(success);
});

server.post(`/heard`, (req, res) => {
  let word = req.body.buzzWord;
  let index = indexOfBuzzWord(word, buzzWords);
  if (index > -1) {
    totalScore += buzzWords[index].points;
    return res.json({ 'totalScore': totalScore });
  } else {
    return res.json(failure);
  }
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${PORT}.`);
  }
});