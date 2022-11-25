import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'

import Header from "../../../components/todolistApp/shared/layout/header/Header";
import useUserAccount from "../../../store";
import noAvatar from '../../../assets/images/noAvatar.png'


type Props = {};

const icons = [
  'friends', 'logout'
]

const EditProfile = (props: Props) => {
  const user = useUserAccount(state => state.user)
  const deleteAccount = useUserAccount(state => state.deleteAccount)
  const [username, setUsername] = useState(user?.username)
  const [email, setEmail] = useState(user?.email)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [changePassword, setChangePassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

  }

  if (user) {
    return (
      <>
      <Header 
          showBackButton={true}
          icons={icons}
        />
        <div className="flex justify-center py-8 mt-6 lg:py-0 w-full">

          {/* Profile Card */}
          <form
            className="bg-white py-6 px-6 w-full md:w-1/2 flex flex-col gap-2"
            area-label="profile-card"
            onSubmit={handleSubmit}
          >
            {/* avatar */}
            <div 
              area-label="avatar"
              className="flex justify-center py-3 "
            >
              <img 
                className="rounded-full border-transparent hover:border-blue-600 hover:border-4 hover:cursor-pointer ease-in duration-200 h-40 w-40"
                src={user.avatar || `${noAvatar}`} 
                alt='user_avatar' 
              />
            </div>
            {/* avatar end */}

            {/* user info */}
            <div          
              area-label="user_info"
              className="mt-4 space-y-3 flex flex-col items-center"
            >
              <div className="w-full">
                <label 
                  htmlFor="username"
                  className="font-semibold"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  area-label="username"
                  className="text-center w-full hover:cursor-pointer shadow-lg py-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div
                className="w-full"
              >
                <div
                  area-label="change_password"
                  className="font-semibold text-left flex flex-col gap-1 py-1"
                >
                  <div className="flex items-center" onClick={() => setChangePassword(prev => !prev)}>
                    <p>Change password</p>
                    <IoIosArrowForward className="text-xl"/>
                  </div>
                  {
                    changePassword &&
                  <div
                    className="space-y-3"
                  >
                    <input
                      area-label="password"
                      className="w-full hover:cursor-pointer shadow-lg py-2 pl-2"
                      placeholder='Your current password'
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      area-label="new_password"
                      className="w-full hover:cursor-pointer shadow-lg py-2 pl-2"
                      placeholder='Your new password'
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    </div>
                  }
                </div>
              </div>            
            </div>
            {/* user info end */}
            
            <button
                className="self-center bg-blue-500 py-2 px-3 rounded-full text-white w-40 hover:scale-110 ease-in duration-200"
              >
                Save changes
            </button>
            <button
              className="mt-2 self-center bg-red-500 py-2 px-3 rounded-full text-white w-40 hover:scale-110 ease-in duration-200"
              onClick={() => deleteAccount()}
            >
              Delete Account
            </button>

          </form>
          {/* Profile Card End */}
        </div>
      </>
      
    );
  }

};

export default EditProfile;
