import Header from "../../../components/todolistApp/shared/layout/header/Header";
import useUserAccount from "../../../store";
import noAvatar from '../../../assets/images/noAvatar.png'

type Props = {};

const icons = [
  'profileEdit', 'friends', 'logout'
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
          className="bg-white py-3 px-6 w-3/4 md:w-1/2"
          area-label="profile-card"
        >
          {/* avatar */}
          <div 
            area-label="avatar"
            className="flex justify-center py-3 h-40 rounded-full"
          >
            <img 
              className="rounded-full"
              src={user.avatar || `${noAvatar}`} 
              alt='user_avatar' 
            />
          </div>
          {/* avatar end */}

          {/* user info */}
          <div          
            area-label="user_info"
            className="mt-4 space-y-3"
          >
            <p
              area-label="username"
              className="text-center font-semibold"
            >
              {user.username}
            </p>
            <p
              area-label="email"
              className="text-center"
            >
              {user.email}
            </p>
          </div>
          {/* user info end */}

        </div>
        {/* Profile Card End */}
      </div>
    </>
  );

  }

 
};

export default Profile;
