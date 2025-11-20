const express = require('express')
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')
const router = express.Router()

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')

router.route('/').get(authenticateUser, getAllReviews)

router
  .route('/')
  .post(authenticateUser, authorizePermissions('user'), createReview)
router
  .route('/:id')
  .patch(authenticateUser, authorizePermissions('user'), updateReview)
  .delete(authenticateUser, authorizePermissions('admin'), deleteReview)
  .get(authenticateUser, getSingleReview)

module.exports = router
