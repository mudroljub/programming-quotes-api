import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

const getToken = async (req, res) => {
  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) 
        return res.status(400).json({ message: 'Invalid credentials' })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      user = new User({
        name,
        email,
        password: hashedPassword
      })
      await user.save()
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return res.json({ message: 'Welcome to Programming Quotes API', token })

  } catch (er) {
    res.status(500).send({ message: 'SERVER_ERROR', error: er.message })
  }
}

export default {
  getToken
}
