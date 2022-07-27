import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { formatCurrency } from "lib/utils";
import { BiBed, BiBath, BiArea, BiPhone } from "react-icons/bi";

export default function ReviewModal({ open, setOpen, setClose, property }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between mb-4">
                        <Dialog.Title className="text-lg font-thin text-gray-900 font-mono">
                          Property summary
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={setClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon
                              className="h-6 w-6 text-red-500"
                              aria-hidden="true"
                              onClick={setClose}
                            />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-col space-y-1 justify-between mb-3">
                          <div>
                            <span className="text-md text-slate-700">
                              Name :
                            </span>
                            <strong className="ml-2 text-md md:text-md font-semibold">
                              {property?.name}
                            </strong>
                          </div>
                          <div>
                            <span className="text-md text-slate-700">
                              Address :
                            </span>
                            <strong className="ml-2 text-md md:text-md font-semibold">
                              {property?.address}
                            </strong>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between  text-sm mb-3">
                            <div className="bg-green-500 rounded-full text-white px-3 inline-block">
                              {property?.type}
                            </div>
                            <div className="bg-violet-500 rounded-full text-white px-3 inline-block">
                              {property?.country}
                            </div>
                          </div>
                          <div className="text-lg font-semibold text-violet-600 mb-3">
                            {property?.price
                              ? formatCurrency(property?.price)
                              : ""}
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <img src={property?.image} alt="not exist" />
                        </div>
                        <div>
                          <div className="flex gap-x-6 text-violet-700 mb-3">
                            <div className="flex gap-x-2 items-center">
                              <BiBed className="text-2xl" />
                              <div className="text-lg font-medium">
                                {property?.bedrooms}
                              </div>
                            </div>
                            <div className="flex gap-x-2 items-center">
                              <BiBath className="text-2xl" />
                              <div className="text-lg font-medium">
                                {property?.bathrooms}
                              </div>
                            </div>
                            <div className="flex gap-x-2 items-center">
                              <BiArea className="text-2xl" />
                              <div className="text-lg font-medium">
                                {property?.surface}
                              </div>
                            </div>
                          </div>
                          <div>{property?.description}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
