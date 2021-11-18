import { WaxUser } from '@eosdacio/ual-wax'

export interface UAL {
  ual: {
    activeAuthenticator: any
    availableAuthenticators: string[]
    activeUser: WaxUser
    showModal: () => void
    loading: boolean
    logout: () => void
  }
}
