import BaseLayout from "./BaseLayout";
import ListHeader from "../components/ListHeader";
import { Outlet, useLocation } from "react-router-dom";

type Props = {};

const TodoLayout = (props: Props) => {
  const location = useLocation()
  
  let currentLocation;
  console.log(location.pathname)
  if(location.pathname === '/') {
    currentLocation = 'overview'
  } else {
    currentLocation = 'todolist'
  }
  return (
    <BaseLayout>
      <div className="flex flex-col mx-auto w-4/5 min-h-screen bg-gray-100">
        <ListHeader location={currentLocation} />
        <Outlet />
      </div>
    </BaseLayout>
  );
};

export default TodoLayout;
