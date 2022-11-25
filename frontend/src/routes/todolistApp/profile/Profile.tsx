
type Props = {};

const Profile = (props: Props) => {
  return (
      <div className="flex justify-center py-8 mt-6 lg:py-0 w-full">

      {/* Profile Card */}
      <div
        className="bg-white py-3 px-6 w-3/4 md:w-1/2"
        area-label="profile-card"
      >
        {/* avatar */}
        <div 
          area-label="avatar"
          className="flex justify-center py-3"
        >
          <img src="" alt="" />
          avatar
        </div>

        <hr />

        {/* user info */}
        <div          
          area-label="user_info"
          className="mt-4 space-y-3"
        >
          <p
            area-label="username"
            className="text-center font-semibold"
          >
            Username
          </p>
          <p
            area-label="email"
            className="text-center"
          >
            email@example.com
          </p>
        </div>
        </div>
      {/* Profile Card End */}
    </div>
  );
};

export default Profile;
