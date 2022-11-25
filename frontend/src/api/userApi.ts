import axiosClient from "./axiosClient"

const userApi = {
    get: () => axiosClient.get('/user'),
    update: () => axiosClient.patch('/update-profile')
}

export default userApi