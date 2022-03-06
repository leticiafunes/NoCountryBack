const {Router} = require ('express');
const router = Router();
const {getNews,  deleteNew, getNew, createNew, updateNew, getNewsByDate, getNewsByPublicDate, deleteAllNew} = require('../controllers/news.controller');
const upload = require ('../middlewares/storage');

router.route ('/')

.get (getNews)
.post ( upload.single('image'), createNew )
.delete (deleteAllNew)


router.route ('/byDate')
.get (getNewsByDate)

router.route ('/byPublicDate')
.get (getNewsByPublicDate)

router.route ('/:id')

.get (getNew)
.put (updateNew )
.delete (deleteNew)




module.exports = router;