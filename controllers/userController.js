const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory')

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el]
    }
  })
  return newObj
}

exports.getAllUsers = getAll(User)
// do not update passwords with this
exports.updateUser = updateOne(User)
exports.deleteUser = deleteOne(User)
exports.getUserByID = getOne(User)

exports.updateMe = catchAsync(async (req, res, next) => {
  // create error if user POSTs password data
  if (req.body.password || req.body.password) {
    return next(
      new AppError(
        'This route is not for password update. Please use updateMyPassword',
        400
      )
    )
  }
  // filter out unwanted fields in obj
  const filteredBody = filterObj(req.body, 'name', 'email')
  // update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })
  res.status(204).json({
    status: 'success',
    data: null
  })
})

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}
