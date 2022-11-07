import BaseLayout from "./BaseLayout";
import ListHeader from "../components/ListHeader";
import { Outlet, useLocation } from "react-router-dom";

type Props = {};

const TodoLayout = (props: Props) => {
  const location = useLocation()
  
  return (
    <BaseLayout>
      <div className="flex flex-col mx-auto w-4/5 min-h-screen bg-gray-100">
        <ListHeader location={location.pathname} />
        <Outlet />
      </div>
    </BaseLayout>
  );
};

export default TodoLayout;
