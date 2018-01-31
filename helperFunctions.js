module.exports = {
  addBuzzWord,
  checkBuzzWordObject,
  indexOfBuzzWord,
  updateBuzzWord,
  deleteBuzzWord
};
const success = { 'success': true };
const failure = { 'success': false };

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

function addBuzzWord(buzzWordObject, req, res) {
  if (checkBuzzWordObject(req.body)) {
    let buzzWords = req.app.locals.buzzWords;
    if (buzzWords.length < 5) {
      if (indexOfBuzzWord(buzzWordObject.buzzWord, buzzWords) === -1) {
        buzzWords.push(buzzWordObject);
        return res.json(success);
      }
    }
  }
  return res.json(failure);
}

function updateBuzzWord(buzzWordObject, req, res) {
  if (checkBuzzWordObject(req.body)) {
    if (indexOfBuzzWord(req.body.buzzWord, req.app.locals.buzzWords) > -1) {
      let buzzWords = req.app.locals.buzzWords;
      let word = buzzWordObject.buzzWord;
      let points = buzzWordObject.points;
      let index = indexOfBuzzWord(word, buzzWords);
      
      buzzWords[index].points = points;
      return res.json(success);
    }
  }
  return res.json(failure);
}

function deleteBuzzWord(req, res) {
  let word = req.body.buzzWord;
  let buzzWords = req.app.locals.buzzWords;
  let index = indexOfBuzzWord(word, buzzWords);

  if (index > -1) {
    buzzWords.splice(index, 1);
    return res.json(success);
  }
  return res.json(failure);
}