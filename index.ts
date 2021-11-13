import { User } from './Interfaces/user'
import UserAccount from './Class/UserAccount'

const Arifin: User = {
  name: 'Muhammad Arifin Effendi',
  username: 'ifindev',
  email: 'effendi.official@Gmail.com',
  password: '',
}

const user = new UserAccount(Arifin)
// Create Password then change the password
user.createPassword('ifin').then((res) => {
  console.log(res)
  console.log('Old Password: ', user.password)
  user.updatePassword('ifin', 'ifindevvv').then((data) => {
    console.log(data)
    console.log('Updated Password: ', user.password)
  })
})
