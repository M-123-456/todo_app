import axiosClient from './axiosClient'
import { IAccountInput } from '../types'

const accountApi = {
    signup: (params: IAccountInput) => axiosClient.post('account/signup', params)
}

export default accountApi