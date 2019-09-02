/* eslint-disable semi */
const express = require('express');
const {
  getAllUsers,
  createUser,
  getUserByID,
  updateUser,
  deleteUser
} = require('./../controllers/userController');

const router = express.Router();

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
