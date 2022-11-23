import { BsPlusCircle } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { GrSave } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

import IconButton from "../components/ui/buttons/IconButton";
import FriendsButton from "../components/ui/buttons/FriendsButton";
import ProfileButton from "../components/ui/buttons/ProfileButton";
import LogoutButton from "../components/ui/buttons/LogoutButton";
import BackButton from "../components/ui/buttons/BackButton";

type Props = {
  location: string;
};

const Header: React.FC<Props> = ({ location }) => {
  const navigate = useNavigate();


  const handleGoToEdit = () => {
    navigate("/profile/edit");
  };

  const handleSave = () => {
    
  }



  // location = overview => show icons on right side (plus, user, logout)
  if (location === "/") {
    return (
      <div className="flex items-center ml-auto space-x-3">
        <IconButton size="text-2xl md:text-3xl">
          <BsPlusCircle />
        </IconButton>
        <ProfileButton />
        <FriendsButton />
        <LogoutButton />
      </div>
    );
  }
  // location  = profile => show back button on left and icons on right side (edit, logout)
  else if (location === "/profile") {
    return (
      <div className="flex justify-between items-center space-x-3">
        <BackButton />
        <div className="flex items-center ml-auto space-x-3">
          <IconButton size="text-2xl md:text-3xl" onClick={handleGoToEdit}>
            <AiFillEdit />
          </IconButton>
          <FriendsButton />
          <LogoutButton />
        </div>
      </div>
    );
  }
  // location  = profile/edit => show back button on left and icons on right side (save, logout)
  else if (location === "/profile/edit") {
    return (
      <div className="flex justify-between items-center space-x-3">
        <BackButton />
        <div className="flex items-center ml-auto space-x-3">
          <IconButton size="text-2xl md:text-3xl" onClick={handleSave}>
            <GrSave />
          </IconButton>
          <FriendsButton />
          <LogoutButton />
        </div>
      </div>
    );
  }

  // location  = friends => show back button on left and icons on right side (save, logout)
  else if (location === "/friends") {
    return (
      <div className="flex justify-between items-center space-x-3">
        <BackButton />
        <div className="flex items-center ml-auto space-x-3">
          <ProfileButton />
          <LogoutButton />
        </div>
      </div>
    );
  }

  // location  = todolist => show back button on left side and icons on right side (plus, user, logout)
  else {
    return (
      <div className="flex justify-between items-center space-x-3">
        <BackButton />
        <div className="flex items-center ml-auto space-x-3">
          <IconButton size="text-2xl md:text-3xl">
            <BsPlusCircle />
          </IconButton>
          <ProfileButton />
          <FriendsButton />
          <LogoutButton />
        </div>
      </div>
    );
  }
};

export default Header;
