const express = require(`express`);
const router = express.Router();
const {
  addBuzzWord,
  checkBuzzWordObject,
  indexOfBuzzWord,
  updateBuzzWord,
  deleteBuzzWord
} = require(`../helperFunctions.js`);
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

module.exports = router;
