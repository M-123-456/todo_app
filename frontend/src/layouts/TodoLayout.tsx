import BaseLayout from "./BaseLayout";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

type Props = {};

const TodoLayout = (props: Props) => {
  const location = useLocation()
  console.log(location)
  
  return (
    <BaseLayout>
      <div className="flex flex-col mx-auto w-4/5 min-h-screen bg-gray-100">
        <Header location={location.pathname}/>
        <Outlet />
      </div>
    </BaseLayout>
  );
};

export default TodoLayout;
