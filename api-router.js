const router = require('express').Router();

// router üzerinden eşleştirmeleri gerçekleştiririz.
const categoryController = require('./controller/categoryController');
const bookController = require('./controller/bookController')
// check isimli nesnesini(kontrol etmek için) kullanarak server tarafına gitmeden validation işlemi yapmamız lazım
const {check} = require('express-validator');


//..localhost/api/category gelirse
router.route('/category').get(categoryController.list)
.post([check('name').notEmpty().withMessage('name alanı boş olamaz')],
categoryController.create)
//  get gelirse list metodu ile eşleş
// post gelirse create ile eşleş

//PUT http://localhost/api/category/1231
router.route('/category/:category_id').put([check('name').notEmpty().withMessage('name alanı boş olamaz')],categoryController.update)
 .delete(categoryController.delete).get(categoryController.getById)



let bookValidation = new Array(
check('title').notEmpty().withMessage('title alanı boş olamaz'),
check('author').notEmpty().withMessage('author alanı boş olamaz'),
check('price').notEmpty().withMessage('price alanı boş olamaz').isFloat().withMessage('price değeri float olmalı'),
check('stock').notEmpty().withMessage('stock alanı boş olamaz').isInt().withMessage('stock alanı integer olmalı'),
check('picture').notEmpty().withMessage('picture alanı boş olamaz'),
check('categoryBy').notEmpty().withMessage('categoryBy alanı boş olamaz')
); 



router.route('/book').get(bookController.list)
.post([bookValidation],bookController.create)

router.route("/books/:category_id").get(bookController.listByCategoryId)

router.route('/book/:book_id').get(bookController.getById)
.put([bookValidation],bookController.update)
.delete(bookController.delete)


// gelen dosyay bookController.upload.single('picture') ifadesi ile kaydedilir.
router.route('/book/saveImage').post(bookController.upload.single("picture")
,bookController.saveImage)


module.exports = router;

