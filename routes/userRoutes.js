/* eslint-disable semi */
const express = require('express');
const {
  getAllUsers,
  createUser,
  getUserByID,
  updateUser,
  deleteUser
} = require('./../controllers/userController');
const {
  signUp,
  login,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updatePassword);

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUserByID)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
