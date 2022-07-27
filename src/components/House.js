import React from "react";
import { formatCurrency } from "lib/utils";

// import icons
import { BiBed, BiBath, BiArea } from "react-icons/bi";

const House = ({ house }) => {
  return (
    <div className="bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition">
      <img
        className="mb-8  h-64 w-80 rounded-tl-[90px] rounded-br-[90px]"
        src={house.image}
        alt="not exist"
      />
      <div className="mb-4 flex gap-x-2 text-sm">
        <div className="bg-green-500 rounded-full text-white px-3 pb-[2px] inline-block">
          {house.type}
        </div>
        <div className="bg-violet-500 rounded-full text-white px-3 pb-[2px] inline-block">
          {house.country}
        </div>
      </div>
      <div className="text-lg font-semibold max-w-[260px]">{house.address}</div>
      <div className="flex gap-x-4 my-4">
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px] rounded-full">
            <BiBed />
          </div>
          <div className="text-base">{house.bedrooms}</div>
        </div>
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px] rounded-full">
            <BiBath />
          </div>
          <div className="text-base">{house.bathrooms}</div>
        </div>
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px] rounded-full">
            <BiArea />
          </div>
          <div className="text-base">{house.surface}</div>
        </div>
      </div>
      <div className="text-lg font-semibold text-violet-600 mb-4">
        {house?.price ? formatCurrency(house.price) : ""}
      </div>
    </div>
  );
};

export default House;
