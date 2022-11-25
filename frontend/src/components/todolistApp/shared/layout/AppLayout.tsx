import BaseLayout from "../../../shared/BaseLayout";
import { Outlet, useLocation } from "react-router-dom";
import useStore from "../../../../store";

type Props = {};

const TodoLayout = (props: Props) => {
  const location = useLocation()
  const user = useStore(state => state.user)
  console.log(user)
  
  return (
    <BaseLayout>
      <div className="flex flex-col mx-auto w-4/5 min-h-screen bg-gray-100">
        <Outlet />
      </div>
    </BaseLayout>
  );
};

export default TodoLayout;
