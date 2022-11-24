import { useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import create from 'zustand'

import accountApi from './api/accountApi'

// types
import { IUser, IAccountInput } from './types'

interface IUseStore {
    user: IUser | null;
    setUser: (loginUser: IUser) => void;
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
        try {
            const response:AxiosResponse<any, any> = await accountApi.signup(input)
            if (response.status === 201) {
                const _user = await response.data
                get().setErrors([])
                get().setLoading(false)
                get().setUser(_user)
            }
        } catch (err: any) {
        const errors:string[] = []
            if (err.status === 400)  {
                for(const error of err.data[0].message) {
                    for (const key in error) {
                        errors.push(`${error[key]}`)
                    }
                get().setLoading(false)
                get().setErrors(errors)
                } 
            } 
            else {
                get().setLoading(false)
                get().setErrors(['Something went wrong'])
            }
        }
    },
}))

export default useStore