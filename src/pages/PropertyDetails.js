import React, { useState } from "react";
import Footer from "components/Footer";
import { toast } from "react-toastify";
import { errorHandler } from "lib/utils";
// import houseData
import { housesData } from "../api/data";
import { useGetPropertyQueryById, useCreateOrderMutation } from "api/property";
//  useParams
import { useParams } from "react-router-dom";
// import icons
import { BiBed, BiBath, BiArea, BiPhone } from "react-icons/bi";
// import link
import { Link } from "react-router-dom";
import { formatCurrency } from "lib/utils";

const PropertyDetails = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [call, setCall] = useState(false);

  const { data: property, isLoading } = useGetPropertyQueryById(id);
  const { mutateAsync: createOrder, isLoading: creatingOrder } =
    useCreateOrderMutation();
  // const property = housesData.find((house) => {
  //   return house.id === id;
  // });

  const toggleNumber = () => {
    setCall(!call);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, phone, message);
    try {
      const { data } = await createOrder({ id, name, email, phone, message });
      if (data) {
        toast.success("your request has been successfully sent");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch (err) {
      toast.error(errorHandler(err));
    }
  };

  if (!property?.data?.name && !property?.data?.type && !isLoading) {
    return (
      <div className="text-center text-3xl text-gray-400 mt-48 flex justify-center items-center h-[100px]">
        Sorry, nothing was found.
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto min-h-[300px] mb-14 mt-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{property?.data.name}</h2>
            <h3 className="text-lg mb-3">{property?.data.address}</h3>
          </div>
          <div className="mb-3 lg:mb-0 flex gap-x-2 text-sm">
            <div className="bg-green-500 rounded-full text-white px-3 inline-block">
              {property?.data.type}
            </div>
            <div className="bg-violet-500 rounded-full text-white px-3 inline-block">
              {property?.data.country}
            </div>
          </div>
          <div className="text-3xl font-semibold text-violet-600">
            {property?.data.price ? formatCurrency(property?.data.price) : ""}
          </div>
        </div>
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="max-w-[768px]">
            <div className="mb-4">
              <img src={property?.data.image} alt="not exist" className="" />
            </div>
            <div className="flex gap-x-6 text-violet-700 mb-3">
              <div className="flex gap-x-2 items-center">
                <BiBed className="text-2xl" />
                <div className="text-lg font-medium">
                  {property?.data.bedrooms}
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiBath className="text-2xl" />
                <div className="text-lg font-medium">
                  {property?.data.bathrooms}
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiArea className="text-2xl" />
                <div className="text-lg font-medium">
                  {property?.data.surface}
                </div>
              </div>
            </div>
            <div>{property?.data.description}</div>
          </div>
          <div className="flex-1 w-full mb-4 bg-white border border-gray-300 rounded-lg px-6 py-6">
            <div className="flex items-center gap-x-4 mb-4">
              <div className="w-22 h-22 p-1 border border-gray-300 rounded-full">
                <img
                  src={property?.data.agent.image}
                  alt="not exist"
                  className="w-[82px] h-[74px] rounded-full"
                />
              </div>
              <div>
                <div className="font-bold text-lg">
                  {property?.data.agent.name}
                </div>
                <Link to="" className="text-violet-700 text-sm">
                  View listings
                </Link>
              </div>
            </div>
            <form className="flex flex-col gap-y-4">
              <input
                className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
                type="text"
                placeholder="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
                type="text"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
                type="text"
                placeholder="Phone*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                className="border border-gray-300 focus:border-violet-700 rounded w-full p-4 h-32 text-sm text-gray-700 outline-none resize-none"
                type="text"
                placeholder="Hello, I am interested in [Modern apartment]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex gap-x-2">
                <button
                  className="bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition disabled:opacity-75 disabled:cursor-not-allowed"
                  type="button"
                  disabled={
                    creatingOrder || !name || !email || !phone || !message
                  }
                  onClick={handleSubmit}
                >
                  {creatingOrder ? "Sending..." : "Send message"}
                </button>
                <button
                  type="button"
                  onClick={toggleNumber}
                  className="border border-violet-700 text-violet-700 hover:border-purple-600 hover:text-purple-600 rounded p-4 text-sm w-full transition"
                >
                  {call ? `${property?.data.agent.phone}` : "Call"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <Footer />
      </div>
    </>
  );
};

export default PropertyDetails;
