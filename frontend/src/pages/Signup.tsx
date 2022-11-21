import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

import AuthInput from "../components/forms/AuthInput";
import useStore from '../store'

type Props = {};

const Signup = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [inputData, setInputData] = useState({
    username:'',
    email: '',
    password: ''
  })
  const user = useStore((state) => state.user)
  const setUser = useStore(state => state.setUser)

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setInputData(prev => ({
      ...prev,
      [target.name]: target.value
    }))
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = 'http://localhost:3001/api/v1/account/signup'

    setLoading(true)
    try {
      const response = await axios.post(url, inputData)
      console.log(response)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }


  }


  return (
    <>
      {/* Sign In Form */}
      <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
        <div className="p-5 lg:p-6 grow w-full">
          <div className="sm:p-5 lg:px-10 lg:py-8">
            <form className="space-y-6" onSubmit={handleSignUp}>
              <AuthInput 
                type="text" 
                content="username" 
                value={inputData.username}
                onChange={handleOnChange} 
              />
              <AuthInput 
                type="email" 
                content="email" 
                value={inputData.email} 
                onChange={handleOnChange} 
              />
              <AuthInput 
                type="password" 
                content="password" 
                value={inputData.password} 
                onChange={handleOnChange} 
              />
              <div>
                <button
                  className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-blue-700 bg-blue-700 text-white hover:text-white hover:bg-blue-800 hover:border-blue-800 focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700"
                >
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="py-4 px-5 lg:px-6 w-full text-sm text-center bg-gray-50">
          You have already an account?
          <Link className="font-medium text-blue-600 hover:text-blue-400 pl-1" to="/login">
            Log in
          </Link>
        </div>
      </div>
      {/* END Sign In Form */}
    </>
  );
};

export default Signup;
