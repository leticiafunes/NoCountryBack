const {Router} = require ('express');
const router = Router();
const { getUsers,  deleteUser, getUser, createUser, updateUser, getUserByUsername ,login} = require('../controllers/users.controller');
const auth = require ('../middlewares/auth')

router.route ('/')
//get ((req, res) => res.send ('Usuarios') )


.get (getUsers)
.post (createUser )


router.route ('/login')

.post (login)



router.route ('/:id')
.get (getUser)


.delete (deleteUser )

.put (updateUser)

router.route ('/userbyusername/:id')
.get (getUserByUsername)


router.route ('/private', auth.isAuth, (req, res) => {
    res.status (200).send ({message: 'access allowed'})
})

module.exports = router;