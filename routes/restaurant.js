const multer = require('multer')
const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant')

/**
 * File upload Handling
 * */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        req.fileUplaodFailed = true;
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/', upload.single('img'), restaurantController.createRestaurant)

router.get('/', restaurantController.findAll)

router.get('/:id', restaurantController.findOne)

router.put('/:id', upload.single('img'), restaurantController.updateRestaurant)

router.delete('/:id', restaurantController.deleteRestaurant)

module.exports = router
