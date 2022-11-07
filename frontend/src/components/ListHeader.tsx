import { BsPlusCircle, BsPersonCircle, BsSave } from "react-icons/bs";
import { HiLogout } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { GrSave } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

import IconButton from "./IconButton";

type Props = {
  location: string;
};

const ListHeader: React.FC<Props> = ({ location }) => {
  const navigate = useNavigate();

  const handleAddTodolist = () => {};

  const handleAddTodo = () => {};

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  const handleSave = () => {
    
  }

  const handleLogout = () => {
    navigate("/login");
  };

  // location = overview => show icons on right side (plus, user, logout)
  if (location === "overview") {
    return (
      <div className="flex items-center ml-auto space-x-3">
        <IconButton size="text-2xl md:text-3xl" onClick={handleAddTodolist}>
          <BsPlusCircle />
        </IconButton>
        <IconButton size="text-2xl md:text-3xl" onClick={handleGoToProfile}>
          <BsPersonCircle />
        </IconButton>
        <IconButton size="text-2xl md:text-3xl" onClick={handleLogout}>
          <HiLogout />
        </IconButton>
      </div>
    );
  }
  // location  = profile => show back button on left and icons on right side (edit, logout)
  else if (location === "/profile") {
    return (
      <div className="flex justify-between items-center space-x-3">
        <Link to="/">
          <div className="flex items-center">
            <IconButton size="text-2xl md:text-3xl">
              <IoIosArrowBack />
            </IconButton>
            <span>OVERVIEW</span>
          </div>
        </Link>
        <span className="flex items-center ml-auto space-x-3">
          <IconButton size="text-2xl md:text-3xl" onClick={handleEdit}>
            <AiFillEdit />
          </IconButton>
          <IconButton size="text-2xl md:text-3xl" onClick={handleLogout}>
            <HiLogout />
          </IconButton>
        </span>
      </div>
    );
  }
  // location  = profile/edit => show back button on left and icons on right side (save, logout)
  else if (location === "/profile/edit") {
    return (
      <div className="flex justify-between items-center space-x-3">
        <Link to="/">
          <div className="flex items-center">
            <IconButton size="text-2xl md:text-3xl">
              <IoIosArrowBack />
            </IconButton>
            <span>OVERVIEW</span>
          </div>
        </Link>
        <span className="flex items-center ml-auto space-x-3">
          <IconButton size="text-2xl md:text-3xl" onClick={handleSave}>
            <GrSave />
          </IconButton>
          <IconButton size="text-2xl md:text-3xl" onClick={handleLogout}>
            <HiLogout />
          </IconButton>
        </span>
      </div>
    );
  }

  // location  = todolist => show back button on left side and icons on right side (plus, user, logout)
  else {
    return (
      <div className="flex justify-between items-center space-x-3">
        <Link to="/">
          <div className="flex items-center">
            <IconButton size="text-2xl md:text-3xl">
              <IoIosArrowBack />
            </IconButton>
            <span>OVERVIEW</span>
          </div>
        </Link>
        <span className="flex items-center ml-auto space-x-3">
          <IconButton size="text-2xl md:text-3xl" onClick={handleAddTodo}>
            <BsPlusCircle />
          </IconButton>
          <IconButton size="text-2xl md:text-3xl" onClick={handleGoToProfile}>
            <BsPersonCircle />
          </IconButton>
          <IconButton size="text-2xl md:text-3xl" onClick={handleLogout}>
            <HiLogout />
          </IconButton>
        </span>
      </div>
    );
  }
};

export default ListHeader;
