const express = require('express')
const router = express.Router()
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController')
const { getSingleProductReviews } = require('../controllers/reviewController')
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')
router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')], createProduct)
  .get(getAllProducts)

router
  .route('/uploadImage')
  .post([authenticateUser, authorizePermissions('admin')], uploadImage)

router
  .route('/:id')
  .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)
  .get(authenticateUser, getSingleProduct)

module.exports = router
router.route('/:id/reviews').get(getSingleProductReviews)
