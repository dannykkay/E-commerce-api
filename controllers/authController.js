const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const customError = require('../errors')
const jwt = require('jsonwebtoken')
const { createTokenUser, attachCookiesToResponse } = require('../utils')
const register = async (req, res) => {
  const { name, email, password } = req.body
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new customError.BadRequestError('Email already in use')
  }

  //first account is registered as admin
  const isFirstAccount = (await User.countDocuments({})) === 0

  const role = isFirstAccount ? 'admin' : 'user'
  const user = await User.create({ name, email, password, role })
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  if (!name || !email || !password) {
    throw new customError.BadRequestError('Please provide all values')
  }

  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new customError.BadRequestError('Please email and password')
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new customError.UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new customError.UnauthenticatedError('Invalid Credentials')
  }
  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  }
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}

module.exports = { register, login, logout }
