import { BsPlusCircle } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { HiLogout } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import IconButton from "./IconButton";

type Props = {
  location: string;
};

const ListHeader: React.FC<Props> = ({ location }) => {
  const navigate = useNavigate();

  const handleAddTodolist = () => {

  }

  const handleAddTodo = () => {

  }

  const handleGoToProfile = () => {
    navigate("/profile");

  }

  const handleLogout = () => {
    navigate('/login')
  }

  // location = overview => show icons on right side (plus, user, logout)
  if (location === "overview") {
    return (
      <div className="ml-auto space-x-3">
        <IconButton size="text-3xl" onClick={handleAddTodolist}>
          <BsPlusCircle />
        </IconButton>
        <IconButton size="text-3xl" onClick={handleGoToProfile}>
          <BsPersonCircle />
        </IconButton>
        <IconButton size="text-3xl" onClick={handleLogout}>
          <HiLogout />
        </IconButton>
      </div>
    );
  }
  // location  = todolist => show back button on left side and icons on right side (plus, user, logout)
  else {
    return (
      <div className="flex justify-between items-center space-x-3">
        <Link to="/">
          <div className="flex items-center">
            <IconButton size="text-3xl">
              <IoIosArrowBack />
            </IconButton>
            <span>OVERVIEW</span>
          </div>
        </Link>
        <span className="ml-auto space-x-3">
          <IconButton size="text-3xl" onClick={handleAddTodo}>
            <BsPlusCircle />
          </IconButton>
          <IconButton size="text-3xl" onClick={handleGoToProfile}>
            <BsPersonCircle />
          </IconButton>
          <IconButton size="text-3xl" onClick={handleLogout}>
            <HiLogout />
          </IconButton>
        </span>
      </div>
    );
  }
};

export default ListHeader;
