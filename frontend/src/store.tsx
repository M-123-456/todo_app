import { AxiosResponse } from 'axios'
import create from 'zustand'

import accountApi from './api/accountApi'
import userApi from './api/userApi'

// types
import { IUser, IAccountInput } from './types'

interface IUseStore {
    user: IUser | null;
    setUser: (loginUser: IUser) => void;
    getUser: () => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (value:boolean) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    errors: string[];
    setErrors: (errors: string[]) => void;
    signup: (input: IAccountInput) => void;

}

const useStore = create<IUseStore>((set, get) => ({
    /** global variable for logged in user */
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
                const errors: string[] =[]
                for (const error of err.data[0].message) {
                    for (const key in error) {
                        errors.push(error[key])
                    }
                }
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
            const response :AxiosResponse<any, any> = await accountApi.signup(input)
            const _user = await response.data
            get().setUser(response.data)
            get().setIsLoggedIn(true)
            get().setLoading(false)
        } catch (err: any) {
        const errors:string[] = []
            if (err.status === 400)  {
                for(const error of err.data[0].message) {
                    for (const key in error) {
                        errors.push(error[key])
                    }
                    get().setErrors(errors)
                } 
            } 
            else {
                get().setErrors(['Something went wrong'])
            }
            get().setIsLoggedIn(false)
            get().setLoading(false)
        }
    },
    // login
}))

export default useStore