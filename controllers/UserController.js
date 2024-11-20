import UserService from '../services/UserService.js' 

const getUser = async (req, res) => {
  const { email } = req.params
  try {
    const user = await UserService.getUser(email)
    res.send(user)
  } catch (e) {
    res.status(500).send({ message: 'SERVER_ERROR', error: e.message })
  }
}

export default {
  getUser,
}
