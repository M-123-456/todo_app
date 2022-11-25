import React, { useState } from "react";
import { Link } from "react-router-dom";

import AccountInput from "../../components/userAccount/AccountInput";
import Loading from "../../components/shared/Loading";
import useStore from '../../store'
import { IAccountInput } from '../../types'

type Props = {};

const Signup = (props: Props) => {
  const loading = useStore(state => state.loading)
  const errors = useStore(state => state.errors)
  const signup = useStore(state => state.signup)
  const [inputData, setInputData] = useState<IAccountInput>({
    username:'',
    email: '',
    password: ''
  })

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setInputData(prev => ({
      ...prev,
      [target.name]: target.value
    }))
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signup(inputData)
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      {/* Sign In Form */}
      <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden min-h-[30rem]">
        <div className="p-5 lg:p-6 grow w-full">
          <div className="sm:p-5 lg:px-10 lg:py-8">
            <form className="space-y-6" onSubmit={handleSignUp}>
              <AccountInput 
                type="text" 
                content="username" 
                value={inputData.username}
                onChange={handleOnChange} 
              />
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
