import React from "react";
import HouseList from "components/HouseList";
import Search from "components/Search";
import Footer from "components/Footer";
// import { useScrollForFetching } from "Hooks/useScrollPosition";

export const PropertyPage = () => {
  // const { scrollHeight, scrollTop, clientHeight } = useScrollForFetching();
  // if (scrollHeight - scrollTop <= clientHeight * 1.5) {
  //   console.log("yes");
  // }
  return (
    <>
      <div className="min-h-[1800px] mt-20 lg:pt-6">
        <Search />
        <HouseList />
      </div>
      <div className="block md:hidden">
        <Footer />
      </div>
    </>
  );
};
