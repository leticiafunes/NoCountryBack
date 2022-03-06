const express = require('express')
const router = express.Router()

const passport = require('passport')
const jwt = require('jsonwebtoken')

const auth = require ('../config/passport')

const {signIn} = require('../controllers/auth');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello World')
})


router.route ('/signin')
.post (signIn)






router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({
    message: 'You did it!',
    user: req.user,
    token: req.query.secret_token,
  })
})

module.exports = router