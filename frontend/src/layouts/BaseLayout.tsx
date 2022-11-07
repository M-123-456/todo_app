import { Outlet } from "react-router-dom";

type Props = {
    children: React.ReactNode
};

const BaseLayout: React.FC<Props> = ({ children }) => {
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
           {children}
          </div>
        </div>
        {/* END Page Content */}
      </main>
      {/* END Page Container */}
    </>
  );
};

export default BaseLayout;
