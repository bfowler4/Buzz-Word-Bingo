const express = require(`express`);
const server = express();
const bodyParser = require('body-parser');
const buzzWords = [];
let totalScore = 0;
const buzzWordsRoute = require(`./routes/buzzWords.js`);

const PORT = process.env.PORT || 8080;

server.locals.buzzWords = buzzWords;
server.locals.totalScore = totalScore;

server.use(bodyParser.urlencoded({ extended: true }));

server.use(`/buzzWords`, buzzWordsRoute);

server.get(`/`, (req, res) => {
  res.sendFile(__dirname + `/public/index.html`);
});





server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${PORT}.`);
  }
});

function getBuzzWord(word) {

}