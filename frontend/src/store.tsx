import { useEffect } from 'react'
import axios from 'axios'
import create from 'zustand'

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
            const response = await axios
            .post('http://localhost:5000/api/v1/account/signup', 
            input, 
            {withCredentials: true})

            if (response.status === 201) {
                const _user = await response.data
                get().setErrors([])
                get().setLoading(false)
                get().setUser(_user)
            }
        } catch (err: any) {
        const errors:string[] = []
            if (err.response.status === 400)  {
                for(const error of err.response.data.message) {
                for (const key in error) {
                    errors.push(`${error[key]}`)
                }
                get().setLoading(false)
                get().setErrors(errors)
                } 
            } else if (err.response.status === 401) {
                get().setLoading(false)
                get().setErrors(['Email or password incorrect'])
            }
            else {
                get().setLoading(false)
                get().setErrors(['Something went wrong'])
            }
        }
    }
}))

export default useStore