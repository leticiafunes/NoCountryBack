const {Router} = require ('express');
const router = Router();
const {sign_upUser, getUsers,  deleteUser, getUser, createUser, updateUser, getUserByUsername} = require('../controllers/users.controller').default;

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


module.exports = router;