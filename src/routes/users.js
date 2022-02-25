const {Router} = require ('express');
const router = Router();
const { getUsers,  deleteUser, getUser, createUser, updateUser, getUserByUsername} = require('../controllers/users.controller');
const auth = require ('../middlewares/auth')

router.route ('/')
//.get ((req, res) => res.send ('user routes') )


.get (getUsers)


//.post ((req, res) => res.send ('POST user routes') )

.post (createUser )




router.route ('/:id')
.get (getUser)


.delete (deleteUser )

.put (updateUser)

router.route ('/userbyusername/:id')
.get (getUserByUsername)


router.route ('/private', auth.isAuth, (req, res) => {
    res.status (200).sen ({message: 'access allowed'})
})

module.exports = router;