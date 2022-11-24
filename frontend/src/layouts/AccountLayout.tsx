import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useStore from "../store";
import BaseLayout from "./BaseLayout";

type Props = {};

const AccountLayout = (props: Props) => {
  const navigate = useNavigate()
  const user = useStore(state => state.user)

  if (user) navigate('/', {replace: true})

  return (
    <>
      <BaseLayout>
              {/* Signin Section */}
              <div className="py-6 lg:py-0 w-full md:w-8/12 lg:w-6/12 xl:w-4/12 relative">
                {/* Header */}
                <div className="mb-8 text-center">
                  <h1 className="text-4xl font-bold inline-flex items-center mb-1 space-x-3">
                    <span>My Todolist</span>
                  </h1>
                  <p className="text-gray-500">any subtitle</p>
                </div>
                {/* END Header */}

                {/* Sign up or Login form */}
                <Outlet />
              </div>
              {/* END Sign In Section */}
      </BaseLayout>
    </>
  );
};

export default AccountLayout;
