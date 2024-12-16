import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const { JWT_SECRET } = process.env

const createToken = (id, privilege) => {
  const tokenData = { id, privilege }
  const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: '24h' })
  return token
}

const sendEmail = user => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mudroljub@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  })
  const token = createToken(user.id, user.privilege)
  const mailOptions = {
    from: 'mudroljub@gmail.com',
    to: user.email,
    subject: 'Programming Quotes - Verify Email',
    text: token
  }

  return transporter.sendMail(mailOptions)
}

export default {
  createToken,
  sendEmail
}
