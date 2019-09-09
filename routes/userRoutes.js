/* eslint-disable semi */
const express = require('express')
const {
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe
} = require('./../controllers/userController')
const {
  signUp,
  login,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
  logOut
} = require('./../controllers/authController')

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.get('/logout', logOut)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

// protect all routes below
router.use(protect)

router.get('/me', getMe, getUserByID)
router.patch('/updateMyPassword', updatePassword)
router.patch('/updateMe', updateMe)
router.patch('/deleteMe', deleteMe)

// restrict all routes below
router.use(restrictTo('admin'))

router.route('/').get(getAllUsers)

router
  .route('/:id')
  .get(getUserByID)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router
