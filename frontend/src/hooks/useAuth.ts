import axios from 'axios'
import { useState, useCallback } from 'react'

const useAuth = (url: string, payload: any) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<string[]>([])
    const [user, setUser] = useState({})

    const callAPI = useCallback(async() => {
        setLoading(true)
        try {
            const response = await axios.post(url, payload, {withCredentials: true})

            if(response.status === 201 || response.status === 200) {
                const data = await response.data
                setErrors([])
                setLoading(false)
                setUser(data)
            }
        } catch(err: any) {
            const errors = []
            if (err.response.status === 400) {
                for(const error of err.response.data.message) {
                    for(const key in error) {
                        errors.push(`${error[key]}`)
                    }
                    setLoading(false)
                    setErrors(errors)
                }
            } else if (err.response.status === 401){
                setLoading(false)
                setErrors(['Email or password incorrect'])
            } else {
                setLoading(false)
                setErrors(['Something went wrong'])
            }
        }
    }, [url, payload])
    return { user, errors, loading }
}

export default useAuth