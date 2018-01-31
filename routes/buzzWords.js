const express = require(`express`);
const router = express.Router();
const {
  addBuzzWord,
  updateBuzzWord,
  deleteBuzzWord
} = require(`../helperFunctions.js`);
const success = { 'success': true };
const failure = { 'success': false };

router.get(`/`, (req, res) => {
  return res.json({ 'buzzWords': req.app.locals.buzzWords });
})
.post(`/`, (req, res) => {
  return addBuzzWord(req.body, req, res);
})
.put(`/`, (req, res) => {
  return updateBuzzWord(req.body, req, res);
})
.delete(`/`, (req, res) => {
  return deleteBuzzWord(req, res);
});

module.exports = router;
