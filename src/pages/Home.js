import React from "react";
import Footer from "components/Footer";

// import components

import Banner from "components/Banner";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <div className="block md:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
