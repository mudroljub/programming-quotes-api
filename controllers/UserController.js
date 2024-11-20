import UserService from '../services/UserService.js' 

const getUser = async (email) => {
  const user = await UserService.getUser(email)
}

export default {
  getUser,
}
