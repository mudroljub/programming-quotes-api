export default class UserResponseDTO {
  constructor(user) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.privilege = user.privilege
    this.memberSince = user.memberSince
    // this.voted = user.voted
  }
}
