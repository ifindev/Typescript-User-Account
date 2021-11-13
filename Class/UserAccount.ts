import { User, UserInfo } from '../Interfaces/user'
import Auth from './Auth'

export default class UserAccount {
  name: string
  username: string
  email: string
  password: string

  auth: Auth = new Auth()

  constructor(user: User) {
    this.name = user.name
    this.username = user.username
    this.email = user.email
    this.password = user.password
  }

  checkCurrentPassword(): boolean {
    var isValid = this.password !== '' ? true : false
    return isValid
  }

  getUserInfo(): UserInfo | string {
    if (this.checkCurrentPassword()) {
      const userInfo: UserInfo = {
        name: this.name,
        username: this.username,
        email: this.email,
      }
      return userInfo
    } else {
      return 'Invalid password! Change your password first!'
    }
  }

  async createPassword(password: string): Promise<string> {
    const hashed = await this.auth.hashPassword(password)
    this.password = hashed
    return 'Password is created successfully!'
  }

  async updatePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<string> {
    let message = ''
    const validPassword = await this.auth.checkPassword(
      oldPassword,
      this.password
    )
    if (validPassword) {
      if (newPassword !== '' || newPassword.length > 8) {
        this.password = await this.auth.hashPassword(newPassword)
        message = 'Password is updated successfully!'
      } else {
        message = 'Minimum password length is 8 characters'
      }
    } else {
      message = 'Failed to update password. Old password is wrong!'
    }
    return message
  }

  async updateEmailOrUsername(
    data: string,
    password: string,
    type: 'email' | 'username'
  ): Promise<string> {
    let message = ''
    const validPassword = await this.auth.checkPassword(password, this.password)
    if (validPassword) {
      switch (type) {
        case 'email':
          message = 'Success updating email!'
          this.email = data
          break
        case 'username':
          message = 'Success updating username!'
          this.username = data
          break
        default:
          message = 'Invalid operation!'
          break
      }
    } else {
      message = 'Wrong password!'
    }
    return message
  }
}
