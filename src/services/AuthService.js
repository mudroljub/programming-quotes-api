import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const { JWT_SECRET } = process.env

const createToken = (id, privilege) => {
  const tokenData = { id, privilege }
  return jwt.sign(tokenData, JWT_SECRET, { expiresIn: '24h' })
}

const sendToken = user => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Preporučeni port za TLS
    secure: false, // Za TLS, postavi na false
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
    html: `Click the link below to verify your email address:<br>
    <a href="http://localhost:5000/api/auth/verify/${token}" target="_blank">Verify Email</a>`
  }

  return transporter.sendMail(mailOptions)
}

const validateToken = token => jwt.verify(token, process.env.JWT_SECRET)

export default {
  createToken,
  sendToken,
  validateToken,
}
