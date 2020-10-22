var express = require('express');
var router = express.Router();
const userData=require('../controllers/userController')
const middleware = require("../middleware/auth");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register',userData.registerUser)
router.post('/login',userData.logIn)
router.get('/list',middleware(),userData.listUsers)
router.delete('/deleteUser/:id',middleware(),userData.deleteUsers)
module.exports = router;
