export interface UserLogin {
  usernameEmail: string
  password: string
}

export interface LoginCredentials {
  username: string
  message: string
  token: string | null
  loginDate: Date | null
}
