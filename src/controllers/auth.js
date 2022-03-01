const User = require("../models/User");
const passport = require('passport')
const jwt = require('jsonwebtoken')




function signUp (req, res) {
    const user = new User({

      email: req.body.email,
      displayName: req.body.displayName
    })
    user.save ((err) => {
        if (err) res.status (500).send ({message: `Error al crear el ususrio: ${err}` })
        return res.status (200).send ({token: service.createToken (user)})
    })
}

const signIn = async (req, res, next) => {


  

  passport.authenticate('signin', async (err, user, info) => {
    try {
      if (err || !user) {
        console.log(err)
        const error = new Error('new Error')
        return next(error)
      }

      //Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session.
      req.login(user, { session: false }, async (err) => {
        if (err) return next(err)
        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, process.env.CLAVE_ESTRATEGIA_LOCAL)
        return res.json({ "user_token:" : token })
      })
    }
    catch(e) {
      return next(e)
    }
  })(req, res, next)
}








module.exports = {signUp, signIn} 
