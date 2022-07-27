import React, { useContext } from "react";
import { useScrollForFetching } from "Hooks/useScrollPosition";

// import context
import { HouseContext } from "store/context";
// import components
import House from "components/House";
// import link
import { Link } from "react-router-dom";
// import icons
import { ImSpinner2 } from "react-icons/im";

import { useGetPropertyQuery } from "api/property";

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);

  const { data, isLoading, hasNextPage, fetchNextPage } = useGetPropertyQuery();
  useScrollForFetching(hasNextPage, fetchNextPage);

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center">
          {/* <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[200px]" /> */}
          <h3>Fetching...</h3>
        </div>
      </>
    );
  }

  if (!data?.pages[0]?.data?.properties?.length && !isLoading) {
    return (
      <div className="text-center text-3xl text-gray-400 mt-48 flex justify-center items-center h-[100px]">
        Sorry, nothing was found.
      </div>
    );
  }

  return (
    <section className="mb-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
          {data?.pages?.map((page) =>
            page?.data?.properties?.map((property) => (
              <Link to={`/property/${property._id}`} key={property._id}>
                <House house={property} />
              </Link>
            ))
          )}

          {/* {!data.pages.length && !isLoading  } */}
          {/* {houses.map((house, index) => {
            return (
              <Link to={`/property/${house.id}`} key={index}>
                <House house={house} />
              </Link>
            );
          })} */}
        </div>
      </div>
    </section>
  );
};

export default HouseList;
