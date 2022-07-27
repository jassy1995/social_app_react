import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import DropDown from "./dropDown";

const user = {
  name: "Admin",
  email: "admin@gmail.com",
  imageUrl:
    "https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-260nw-221431012.jpg",
};

function Navbar({ logo }) {
  const logout = () => {
    console.log("logout");
  };

  return (
    <div className="fixed top-0 left-0 w-full">
      <Disclosure
        as="nav"
        className=" h-16  bg-gradient-to-tr from-blue-500 to-blue-700"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="">
                    <div className="font-thin text-xl text-white bg-myColor-transparent rounded-full md:capitalize md:first-letter:font-medium first-letter:text-3xl  md:first-letter:text-4xl first-letter:font-bold">
                      {logo}
                    </div>
                  </div>
                  {/* <div className="hidden md:block ml-10">
                    <DropDown />
                  </div> */}
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="ml-3 relative">
                      <div className="flex">
                        <Menu.Button
                          className="font-medium font-mono text-red-500 bg-white rounded-full ml-2  p-3 px-6 pt-2 py-2"
                          onClick={logout}
                        >
                          logout
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <div>Dashboard</div>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="bg-myColor inline-flex  text-white items-center justify-center p-2 rounded-md text-white-400 hover:text-white hover:bg-myColor focus:outline-none focus:ring-1 focus:p-1 focus:ring-offset-1 focus:ring-offset-gray-200 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden bg-gradient-to-tr from-blue-500 to-blue-700">
              <div className="flex px-2 pt-2  pb-3 justify-between sm:px-3">
                <Link to="/">
                  <button className="bg-myColor text-white px-3 py-2 rounded-md text-sm font-medium  ring-1 ring-white hover:bg-myColor hover:text-slate-200">
                    Dashboard
                  </button>
                </Link>

                {/* <DropDown /> */}
              </div>
              <div className="pt-4 pb-3 border-t border-white">
                <div className="flex justify-between items-center px-2">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-thin leading-none text-white">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={logout}
                      className="ml-auto px-2  bg-white flex-shrink-0 p-1 rounded-full text-red-500 hover:text-red-300 text-sm focus:outline-none focus:ring-1  focus:ring-offset-white focus:ring-white font-mono"
                    >
                      <span className="sr-only">View notifications</span>
                      logout
                    </button>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

Navbar.defaultProps = {
  logo: "Wesabi",
};

Navbar.propTypes = {
  logo: PropTypes.string,
};

export default Navbar;
