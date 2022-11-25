import { MdModeEditOutline } from 'react-icons/md'
import { BsPlusCircleFill } from 'react-icons/bs'

import Header from "../../../components/todolistApp/shared/layout/header/Header";
import useUserAccount from "../../../store";
import noAvatar from '../../../assets/images/noAvatar.png'

type Props = {};

const icons = [
  'friends', 'logout'
]

const Profile = (props: Props) => {
  const user = useUserAccount(state => state.user)

  if (user) {
     return (
    <>
      <Header 
        showBackButton={true}
        icons={icons}
      />
      <div className="flex justify-center py-8 mt-6 lg:py-0 w-full">

        {/* Profile Card */}
        <div
          className="bg-white py-3 px-6 w-full md:w-1/2 flex flex-col items-center"
          area-label="profile-card"
        >
          {/* avatar */}
          <div 
            area-label="avatar"
            className="flex justify-center py-3 relative"
          >
            <img 
              className="rounded-full  h-40 w-40"
              src={user.avatar || `${noAvatar}`} 
              alt='user_avatar' 
            />
            <BsPlusCircleFill 
              className="absolute text-2xl right-3 bottom-6 hover:scale-150 ease-in duration-200"
            />
          </div>
          {/* avatar end */}

          {/* user info */}
          <div          
            area-label="user_info"
            className="mt-4 space-y-3"
          >
            <div
              className="flex justify-center gap-2 items-center"
            >
              <p
                area-label="username"
                className="text-center font-semibold"
              >
                {user.username}
              </p>
              <MdModeEditOutline 
                className="text-xl hover:scale-150 ease-in duration-200"
              />
            </div>
            
            <p
              area-label="email"
              className="text-center"
            >
              {user.email}
            </p>
            
          </div>

          <button
              className="mt-2 self-center bg-red-500 py-2 px-3 rounded-full text-white w-40 hover:scale-110 ease-in duration-200"
            >
              Change Password
          </button>
          {/* user info end */}

          

        </div>
        {/* Profile Card End */}
      </div>
    </>
  );

  }

 
};

export default Profile;
