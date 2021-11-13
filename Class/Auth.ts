import { UserLogin, LoginCredentials } from '../Interfaces/auth'
import * as bcrypt from 'bcrypt'

export default class Auth {
  constructor() {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    return hashed
  }

  async checkPassword(
    oldPassword: string,
    currentPassword: string
  ): Promise<boolean> {
    const validPassword = await bcrypt.compare(oldPassword, currentPassword)
    return validPassword
  }
}
