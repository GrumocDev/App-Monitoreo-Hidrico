import { atom } from 'recoil'

export interface UserState {
  isLoggedIn: boolean
  username?: string
  email?: string
  token?: string
  id?: number
  role?: string
}

const userState = atom<UserState>({
  key: 'userState',
  default: {
    isLoggedIn: false,
    username: undefined,
    email: undefined,
    token: undefined,
    id: undefined,
    role: undefined
  }
})

export default userState
