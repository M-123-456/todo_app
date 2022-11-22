import axiosClient from './axiosClient'



const accountApi = {
    signup: (params) => axiosClient.post('account/signup', params)
}

export default accountApi