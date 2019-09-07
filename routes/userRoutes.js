/* eslint-disable semi */
const express = require('express')
const {
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe
} = require('./../controllers/userController')
const {
  signUp,
  login,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo
} = require('./../controllers/authController')

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)

router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)
router.patch('/updateMyPassword', protect, updatePassword)
router.patch('/updateMe', protect, updateMe)
router.patch('/deleteMe', protect, deleteMe)

router.route('/').get(getAllUsers)

router
  .route('/:id')
  .get(getUserByID)
  .patch(updateUser)
  .delete(protect, restrictTo('user'), deleteUser)

module.exports = router
