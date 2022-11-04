import { Outlet } from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <>
      {/* Page Container */}
      <main
        id="page-container"
        className="flex flex-col mx-auto w-full min-h-screen bg-gray-100"
      >
        {/* Page Content */}
        <div id="page-content" className="flex flex-auto flex-col max-w-full">
          <div className="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
           
            {/* Signin Section */}
            <div className="py-6 lg:py-0 w-full md:w-8/12 lg:w-6/12 xl:w-4/12 relative">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold inline-flex items-center mb-1 space-x-3">
                  <span>My Todolist</span>
                </h1>
                <p className="text-gray-500">
                  any subtitle
                </p>
              </div>
              {/* END Header */}

              {/* Sign up or Login form */}
              <Outlet />
              
            </div>
            {/* END Sign In Section */}
          </div>
        </div>
        {/* END Page Content */}
      </main>
      {/* END Page Container */}
    </>
  );
};

export default AuthLayout;
