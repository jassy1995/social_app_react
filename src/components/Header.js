import React from "react";
import useGlobalStore from "store/global";
import { useScrollPosition } from "Hooks/useScrollPosition";
import { toast } from "react-toastify";

// import link
import { Link } from "react-router-dom";
// import logo
import Logo from "assets/img/logo.svg";

const Header = () => {
  const { property_admin, SIGNOUT } = useGlobalStore((state) => ({
    property_admin: state.data.property_admin,
    SIGNOUT: state.SIGNOUT,
  }));
  const scrollPosition = useScrollPosition();

  const handleLogout = () => {
    SIGNOUT();
    localStorage.removeItem("property_admin");
    toast.success("successful log out");
    window.location.href = "/";
  };
  return (
    <header
      className={`py-6  mb-20   border-b z-20 fixed top-0 right-0 left-0 bg-white ${
        scrollPosition > 0 ? "shadow-lg" : ""
      } `}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="hidden text-sm lg:text-md md:block">
          <div className="font-medium text-xl text-violet-900 bg-myColor-transparent rounded-full md:capitalize md:first-letter:font-medium first-letter:text-2xl  md:first-letter:text-4xl first-letter:font-bold">
            Property
          </div>
        </Link>
        <div className="space-x-2 md:space-x-8">
          <Link
            to="/"
            className="text-sm lg:text-md font-bold hover:border-b-4 hover:border-violet-500 font-mono"
          >
            Home
          </Link>
          <Link
            to="/property"
            className="text-sm lg:text-md font-bold hover:border-b-4 hover:border-violet-500"
          >
            Property
          </Link>
          {property_admin && (
            <>
              <Link
                to="/orders"
                className="text-sm lg:text-md font-bold hover:border-b-4 hover:border-violet-500"
              >
                Orders
              </Link>
              <Link
                to="/create-property"
                className="text-sm lg:text-md font-bold hover:border-b-4 hover:border-violet-500"
              >
                Add Property
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-6">
          {property_admin ? (
            <Link
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-full transition font-mono text-sm lg:text-md"
              to="/"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                className="hover:text-violet-900 transition text-sm lg:text-md hover:border-b-4 hover:border-violet-500"
                to="/login"
              >
                Log in
              </Link>
              <Link
                className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-full transition font-mono text-sm lg:text-md"
                to="/signUp"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
