const jwt = require('jsonwebtoken')

export const passwordGenerator = () => {
  const { NODEMAILER_PASSWORD } = process.env
  const randomPassword = Math.random().toString(36).slice(-10)
  const encryptedPassword = jwt.sign(randomPassword, NODEMAILER_PASSWORD);
  return encryptedPassword
} 