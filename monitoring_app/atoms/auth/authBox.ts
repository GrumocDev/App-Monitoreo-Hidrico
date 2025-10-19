import { atom } from 'recoil'

export type authBoxModes = 'login' | 'signup' | 'reset'

export interface AuthBoxState {
  isOpen: boolean
  mode: authBoxModes
}

const authBoxState = atom<AuthBoxState>({
  key: 'authBoxState',
  default: {
    isOpen: false,
    mode: 'login'
  }
})

export default authBoxState
