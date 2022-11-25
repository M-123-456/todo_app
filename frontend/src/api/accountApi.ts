import axiosClient from './axiosClient'
import { IAccountInput } from '../types'

const accountApi = {
    signup: (params: IAccountInput) => axiosClient.post('account/signup', params),
    login: (params: { email: string, password: string }) => axiosClient.post('account/login', params),
    logout: () => axiosClient.get('account/logout'),
    delete: () => axiosClient.delete('/delete')
}

export default accountApi