import { AxiosResponse } from 'axios'
import create from 'zustand'

import accountApi from './api/accountApi'
import userApi from './api/userApi'
import { getErrorArrays } from './utils/storeErrors'

// types
import { IUser, IAccountInput } from './types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './components/shared/Loading'

interface IUseStore {
    user: IUser | null;
    setUser: (loginUser: IUser | null) => void;
    getUser: () => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (value:boolean) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    errors: string[];
    setErrors: (errors: string[]) => void;
    signup: (input: IAccountInput) => void;
    login: (input: Omit<IAccountInput, 'username'>) => void;
    logout: () => void;
}

const useStore = create<IUseStore>((set, get) => ({
    /** global variable for login user */
    user: null,
    setUser: (loginUser) => {
        set((state) => ({
            user: loginUser
        }))
    },
    getUser: async () => {
        get().setErrors([])
        get().setLoading(true)
        try {
            const response: AxiosResponse<any, any> = await userApi.get()
            get().setUser(response.data)
            get().setIsLoggedIn(true)
            get().setLoading(false)
        } catch (err: any) {
            if(err.status === 400) {
                const errors = getErrorArrays(err.data[0].message)
                get().setErrors(errors)
            } else {
                get().setErrors(['Something went wrong!'])
            }
            get().setLoading(false)
            get().setIsLoggedIn(false)
        }
    },
    isLoggedIn: false,
    setIsLoggedIn: (value) => {
        set(state => ({
            isLoggedIn: value
        }))
    },
    /** if fetching userData, return true, otherwise return false */
    loading: false,
    setLoading: (value) => {
        set(state => ({ loading: value }))
    },
    /** store errors occured during fetching process */
    errors: [],
    setErrors: (errors) => {
        set(state => ({ errors: errors }))
    },
    signup: async (input) => {
        get().setErrors([])
        get().setLoading(true)
        try {
            const response:AxiosResponse<any, any> = await accountApi.signup(input)
            const _user = await response.data
            get().setUser(response.data)
            get().setIsLoggedIn(true)
            get().setLoading(false)
        } catch (err: any) {
            if (err.status === 400)  {
                const errors = getErrorArrays(err.data[0].message)
                get().setErrors(errors)
            } 
            else {
                get().setErrors(['Something went wrong'])
            }
            get().setIsLoggedIn(false)
            get().setLoading(false)
        }
    },
    login: async(input) => {
        get().setErrors([])
        get().setLoading(true)
        try {
            const response:AxiosResponse<any, any> = await accountApi.login(input)
            get().setUser(response.data)
            get().setIsLoggedIn(true)
            get().setLoading(false)
        } catch (err: any) {
            if (err.status === 400) {
                const errors = getErrorArrays(err.data[0].message)
                get().setErrors(errors)
            }
            else if (err.status === 401) {
                get().setErrors(['Email or password incorrect'])
            } else {
                get().setErrors(['Something went wrong!'])
            }
            get().setIsLoggedIn(false)
            get().setLoading(false)
        } 
    },
    logout: async() => {
        await accountApi.logout()
        get().setUser(null)
    }
}))


/** Component to call check login user */
export function UserCheckIn () {
    const navigate = useNavigate()
    const user = useStore(state => state.user)
    const loading = useStore(state => state.loading)
    const isLoggedIn = useStore(state => state.isLoggedIn)
    const getUser = useStore(state => state.getUser)
    useEffect(() => {
        if (!isLoggedIn) getUser()
    }, [])

    useEffect(() => {
        if (user) navigate('/', {replace: true})
        else navigate('/login')
    }, [isLoggedIn, user])

    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div></div>
    )
}


export default useStore