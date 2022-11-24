import axiosClient from "./axiosClient"

const userApi = {
    get: () => axiosClient.get('/user')
}

export default userApi