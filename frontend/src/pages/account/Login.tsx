import axios from 'axios';
import React, { useState } from 'react' 
import { Link, useNavigate } from "react-router-dom";
import AccountInput from "../../components/forms/AccountInput";
import { IAccountInput } from '../../types'
import useStore from '../../store'


type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])
  const [inputData, setInputData] = useState<Omit<IAccountInput, 'username'>>({
    email: '',
    password: ''
  })
  const user = useStore(state => state.user)
  const setUser = useStore(state => state.setUser)

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setInputData(prev => ({
      ...prev,
      [target.name]: target.value
    }))
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/v1/account/login', inputData, {withCredentials: true})
      console.log(response)
      if (response.status === 200) {
        console.log('ok')
        const _user = await response.data
        setErrors([])
        setLoading(false)
        setUser(_user)
        navigate('/', {replace: true})
      }
    } catch (err: any) {
      console.log(err)
      const errors = []
      if (err.response.status === 400)  {
        for(const error of err.response.data.message) {
          for (const key in error) {
            errors.push(`${error[key]}`)
          }
          setLoading(false)
          setErrors(errors)
        } 
      } else if (err.response.status === 401) {
        setLoading(false)
        setErrors(['Email or password incorrect'])
      }
      else {
        setLoading(false)
        setErrors(['Something went wrong'])
      }
    }
  }

  if (loading) {
    return (
      <div className="flex rounded shadow-sm bg-white overflow-hidden justify-center items-center min-h-[30rem]">
       <div>Loading...</div>
      </div>
    )
  }

  return (
    <>
      {/* Sign In Form */}
      <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
        <div className="p-5 lg:p-6 grow w-full">
          <div className="sm:p-5 lg:px-10 lg:py-8">
            <form className="space-y-6" onSubmit={handleLogin}>
              <AccountInput 
                type="email" 
                content="email"
                value={inputData.email}
                onChange={handleOnChange} 
              />
              <AccountInput 
                type="password" 
                content="password" 
                value={inputData.password}
                onChange={handleOnChange} 
              />
              <div>
                {
                  errors.map(error => (
                    <div 
                      key={error}
                      className="text-red-700 font-semibold"
                    >
                      {error}
                    </div>
                  ))
                }
                <button
                  type="submit"
                  className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-blue-700 bg-blue-700 text-white hover:text-white hover:bg-blue-800 hover:border-blue-800 focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="py-4 px-5 lg:px-6 w-full text-sm text-center bg-gray-50">
          Don’t have an account yet?
          <Link
            className="font-medium text-blue-600 hover:text-blue-400 pl-1"
            to="/signup"
          >
            Join us today
          </Link>
        </div>
      </div>
      {/* END Sign In Form */}
    </>
  );
};

export default Login;
