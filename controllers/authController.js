const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')
// built in promisify
const { promisify } = require('util')
const sendEmail = require('./../utils/email')
const crypto = require('crypto')

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  })
};

exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })
  createSendToken(user, 201, res)
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  // check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400))
  }
  // check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }
  // if everything is ok, send token to client
  createSendToken(user, 200, res)
})

exports.protect = catchAsync(async (req, res, next) => {
  // get token and check if it exists
  let token
  const auth = req.headers.authorization
  if (auth && auth.startsWith('Bearer')) {
    token = auth.split(' ')[1]
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }
  // validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // check if user still exists
  const freshUser = await User.findById(decoded.id)
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    )
  }
  // check if user changed psw after token was issued
  if (!freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    )
  }
  // grant access to protected route
  req.user = freshUser
  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }
    next()
  };
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get user based on email
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new AppError('There is no user with email address.'), 404)
  }
  // generate random token
  const resetToken = user.createPasswordResetToken()
  // does not require psw to save
  await user.save({ validateBeforeSave: false })
  // send back as email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`
  const message =
    'Forgot your password? Submit a patch request with ' +
    `your new password and passwordConfirm to ${resetURL}.\n` +
    'If you did not forget your password, please ignore this message.';
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message
    })
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })
    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    )
  }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
  // get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gte: Date.now() }
  })
  // if token has not expired and there is a user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400))
  }
  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()
  // update changedPasswordAt property for the user
  // log the user in, send JWT
  createSendToken(user, 200, res)
})

exports.updatePassword = catchAsync(async (req, res, next) => {
  // get user from collection
  const user = await User.findById(req.body.id).select('+password')
  // check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401))
  }
  // update password
  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  await user.save()
  // User.findByIDandUpdate will not validate
  // log user in
  createSendToken(user, 200, res)
})
