const {Router} = require ('express');
const router = Router();
const {getAdvertisements,  deleteAdvertising, getAdvertising, createAdvertising, updateAdvertising, getAdvertisementsByDate, getAdvertisementsByPublicDate, deleteAllAdvertisements} = require('../controllers/advertisements.controller');
//const upload = require ('../middlewares/storage');

router.route ('/')

.get (getAdvertisements)
//.post ( upload.single('image'), createAdvertising )
.post ( createAdvertising )
.delete (deleteAllAdvertisements)


router.route ('/byDate')
.get (getAdvertisementsByDate)

router.route ('/byPublicDate')
.get (getAdvertisementsByPublicDate)

router.route ('/:id')

.get (getAdvertising)
.put (updateAdvertising )
.delete (deleteAdvertising)


module.exports = router;