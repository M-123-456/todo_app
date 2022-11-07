type Props = {};

const EditProfile = (props: Props) => {
  return (
    <div className="flex justify-center py-6 lg:py-0 w-full">
      {/* Profile Card */}
      <div
        className="bg-white py-3 px-6 w-3/4 md:w-1/2"
        area-label="profile-card"
      >
        <div area-label="avatar">picture</div>
        <hr />
        <h3>User name</h3>
        <p>Password</p>
        <ul area-label="friends-list">
          <li>Friend one</li>
          <li>Friend two</li>
          <li>Friend three</li>
        </ul>
      </div>
      {/* Profile Card End */}
    </div>
  );
};

export default EditProfile;
