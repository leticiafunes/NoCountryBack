//passport.js

/*Now, we’ll create a middleware, that allows only requests 
with valid tokens to access some special routes needing authentication, 
eg. /user/profile. For this, we will use the passport-jwt strategy. We’ll add it in our passport.js file*/

const passport = require('passport')
const localStrategy = require('passport-local').Strategy  //no se loguea con redes
const User = require('../models/User')

const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.create({ email, password })
        return done(null, user)
    } catch (e) {
        done(e)
    }
}))

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email })
        console.log ("Usuario:" , user);
        if (!user) {
            return done(null, false, { message: 'User not found' })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
            return done(null, false, { message: 'Wrong password' })
        }

        return done(null, user, { message: 'Login successfull' })
    } catch (e) {
        return done(e)
    }
}))

passport.use(new JWTStrategy({
    secretOrKey: process.env.CLAVE_ESTRATEGIA_LOCAL,
    jwtFromRequest: ExtractJWT.fromHeader(process.env.LLAVE_ESTRATEGIA_LOCAL)
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (e) {
        done(error)
    }
}))