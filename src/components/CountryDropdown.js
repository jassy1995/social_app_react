import React, { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { RiMapPinLine } from "react-icons/ri";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CountryDropdown = (props) => {
  // console.log(props.option);
  // const locations = [
  //   {
  //     value: "Location (any)",
  //   },
  //   {
  //     value: "United States",
  //   },
  //   {
  //     value: "Canada",
  //   },
  // ];

  return (
    <Menu as="div" className="relative inline-block w-48 z-40">
      <div className="flex items-center space-x-1 mb-1">
        <RiMapPinLine />
        <small className="text-[15px]  leading-tight mb-1 font-mono">
          Location
        </small>
      </div>
      <div>
        <Menu.Button className="inline-flex justify-between h-10 items-center w-full rounded-sm border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {props.country ? props.country : "select country"}
          <ChevronDownIcon className="mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
          <div className="py-1">
            {props.option.map((location, index) => {
              return (
                <Menu.Item
                  key={index}
                  onClick={() => {
                    props.getCountry(location);
                  }}
                >
                  {({ active }) => (
                    <span
                      className={classNames(
                        active ? "bg-blue-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm cursor-pointer"
                      )}
                    >
                      {location}
                    </span>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CountryDropdown;
