import React, { useState } from "react";
import { useGetPropertyQuery, useGetPropertyQueryOption } from "api/property";
import { useScrollForFetching } from "Hooks/useScrollPosition";
import CountryDropdown from "./CountryDropdown";
import PropertyDropdown from "./PropertyDropdown";
import PriceRangeDropdown from "./PriceRangeDropdown";
import { RiSearch2Line } from "react-icons/ri";

const Search = () => {
  const [country, setCountry] = useState(null);
  const [type, setType] = useState(null);
  const [price, setPrice] = useState(null);
  const [searchParam, setSearchParam] = useState(null);
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useGetPropertyQuery(searchParam);
  const { data: options } = useGetPropertyQueryOption();
  useScrollForFetching(hasNextPage, fetchNextPage);

  const handleSearches = () => {
    setSearchParam({ country: country, type: type, price: price });
  };

  const getCountry = (country) => {
    setCountry(country);
  };
  const getType = (type) => {
    setType(type);
  };
  const getPrice = (price) => {
    setPrice(price);
  };
  return (
    <div className="px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col sm:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg lg:mt-4">
      <CountryDropdown
        getCountry={getCountry}
        country={country}
        option={["Location (any)", ...options.data.countries]}
      />
      <PropertyDropdown
        getType={getType}
        type={type}
        option={["Property type (any)", ...options.data.types]}
      />
      <PriceRangeDropdown
        getPrice={getPrice}
        price={price}
        option={["Price range (any)", ...options.data.prices]}
      />
      <button
        onClick={handleSearches}
        className="bg-violet-700 hover:bg-violet-800 transition w-48 h-10 rounded-sm flex space-x-2 justify-center items-center text-white text-md sm:mt-6"
      >
        <RiSearch2Line />
        <span>Search</span>
      </button>
    </div>
  );
};

export default Search;
