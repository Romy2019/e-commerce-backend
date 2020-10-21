var express = require('express');
var router = express.Router();
const userData=require('../controllers/userController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register',userData.registerUser)
router.post('/login',userData.logIn)

module.exports = router;
