const jwt = require('jsonwebtoken')

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
  return token
}
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user })
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1 day
    secure: process.env.NODE_ENV === 'production', //cookie only works on https
    signed: true,
    //cookie is signed
  })
}
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

module.exports = { createJWT, isTokenValid, attachCookiesToResponse }
