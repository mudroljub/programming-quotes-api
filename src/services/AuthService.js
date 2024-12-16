import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const { JWT_SECRET } = process.env

const createToken = (id, privilege) => {
  const tokenData = { id, privilege }
  const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: '24h' })
  return token
}

const sendEmail = email => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mudroljub@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: 'mudroljub@gmail.com',
    to: email,
    subject: 'Programming Quotes - Verify Email',
    text: 'That was easy!' // TODO: token link
  }

  return transporter.sendMail(mailOptions)
}

export default {
  createToken,
  sendEmail
}
