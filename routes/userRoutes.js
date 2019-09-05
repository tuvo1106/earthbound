/* eslint-disable semi */
const express = require('express');
const {
  getAllUsers,
  createUser,
  getUserByID,
  updateUser,
  deleteUser
} = require('./../controllers/userController');
const { signUp, login } = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

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
