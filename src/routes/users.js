const {Router} = require ('express');
const router = Router();
const { getUsers,  deleteUser, getUser, createUser, updateUser, getUserByUsername ,login} = require('../controllers/users.controller');
const auth = require ('../middlewares/auth')

const passport = require('passport')
const jwt = require('jsonwebtoken')


router.route ('/')
//get ((req, res) => res.send ('Usuarios') )


.get ( passport.authenticate('jwt', { session: false }), getUsers)
.post (passport.authenticate('jwt', { session: false }), createUser )


router.route ('/login')
.post (login)


router.route ('/:id')
.get (passport.authenticate('jwt', { session: false }),getUser)
.delete (passport.authenticate('jwt', { session: false }), deleteUser )
.put (passport.authenticate('jwt', { session: false }), updateUser)

router.route ('/userbyusername/:id')
.get (passport.authenticate('jwt', { session: false }), getUserByUsername)


router.route ('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status (200).send ({message: 'access allowed'})
})


router.route ('/logout')

.post(function(req, res){
    req.logout();
    res.redirect('/');
  });



module.exports = router;