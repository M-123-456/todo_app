import { Link } from "react-router-dom";
import AuthInput from "../components/forms/AuthInput";


type Props = {};

const Login = (props: Props) => {
  return (
    <>
      {/* Sign In Form */}
      <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
        <div className="p-5 lg:p-6 grow w-full">
          <div className="sm:p-5 lg:px-10 lg:py-8">
            <form className="space-y-6">
              {/* <AuthInput type="email" content="email" /> */}
              {/* <AuthInput type="password" content="password" /> */}
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-blue-700 bg-blue-700 text-white hover:text-white hover:bg-blue-800 hover:border-blue-800 focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="py-4 px-5 lg:px-6 w-full text-sm text-center bg-gray-50">
          Don’t have an account yet?
          <Link
            className="font-medium text-blue-600 hover:text-blue-400 pl-1"
            to="/signup"
          >
            Join us today
          </Link>
        </div>
      </div>
      {/* END Sign In Form */}
    </>
  );
};

export default Login;
