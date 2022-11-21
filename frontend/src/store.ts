import { useEffect } from 'react'
import create from 'zustand'

// types
import { IUser } from './types'

interface useStoreState {
    user: IUser | null;
    setUser: (loginUser: IUser) => void;
}

const useStore = create<useStoreState>((set) => ({
    user: null,
    setUser: (loginUser) => {
        set((state) => ({
            user: loginUser
        }))
    }
})) 

export default useStore