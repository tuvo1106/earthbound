const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a password'],
    validate: {
      validator: function (el) {
        // this only works on create and save
        // abc123 = abc123
        return el === this.password
      },
      message: 'Passwords are not the same!'
    }
  }
})

// document middleware to encrypt password
userSchema.pre('save', async function (next) {
  // only encrypt when user creates or updates password
  if (!this.isModified('password')) {
    return next()
  }
  // hash with bcrypt with cost of 12
  this.password = await bcrypt.hash(this.password, 12)
  // delete passwordConfirm
  this.passwordConfirm = undefined
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
