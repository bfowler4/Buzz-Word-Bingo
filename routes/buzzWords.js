const express = require(`express`);
const router = express.Router();
const success = { 'success': true };
const failure = { 'success': false };

router.get(``, (req, res) => {
  res.json({ 'buzzWords': req.app.locals.buzzWords });
})
.post(``, (req, res) => {
  if (checkBuzzWordObject(req.body)) {
    addBuzzWord(req.body, req, res);
    return;
  }
  res.json(failure);
})
.put(``, (req, res) => {
  if (checkBuzzWordObject(req.body)) {
    if (indexOfBuzzWord(req.body.buzzWord, req.app.locals.buzzWords) > -1) {
      updateBuzzWord(req.body, req, res);
      return;
    }
  }
  res.json(failure);
})
.delete(``, (req, res) => {
  deleteBuzzWord(req, res);
});

function addBuzzWord(buzzWordObject, req, res) {
  let buzzWords = req.app.locals.buzzWords;
  if (buzzWords.length < 5) {
    if (indexOfBuzzWord(buzzWordObject.buzzWord, buzzWords) === -1) {
      buzzWords.push(buzzWordObject);
      res.json(success);
      return true;
    }
  }
  res.json(failure);
  return false;
}

function checkBuzzWordObject(buzzWordObject) {
  if (Object.keys(buzzWordObject).length === 2) {
    if (buzzWordObject.hasOwnProperty(`buzzWord`) && buzzWordObject.hasOwnProperty(`points`)) {
      buzzWordObject.points = parseInt(buzzWordObject.points);
      if (!isNaN(buzzWordObject.points) && buzzWordObject.buzzWord) {
        return true;
      }
    }
  }
  return false;
}

function indexOfBuzzWord(word, buzzWords) {
  for (let i = 0; i < buzzWords.length; i ++) {
    if (buzzWords[i].buzzWord === word) {
      return i;
    }
  }
  return -1;
}

function updateBuzzWord(buzzWordObject, req, res) {
  let buzzWords = req.app.locals.buzzWords;
  let word = buzzWordObject.buzzWord;
  let points = buzzWordObject.points;
  let index = indexOfBuzzWord(word, buzzWords);
  
  buzzWords[index].points = points;
  res.json(success);
}

function deleteBuzzWord(req, res) {
  let word = req.body.buzzWord;
  let buzzWords = req.app.locals.buzzWords;
  let index = indexOfBuzzWord(word, buzzWords);

  if (index > -1) {
    buzzWords.splice(index, 1);
    res.send(success);
    return;
  }
  res.send(failure);
}

module.exports = router;
