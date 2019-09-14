const Tour = require('./../models/tourModel')
const catchAsync = require('./../utils/catchAsync')

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find()
  res.status(200).render('overview', {
    title: 'Home',
    tours
  })
})

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  })
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  })
})

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login'
  })
})

exports.signUp = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign Up'
  })
})
