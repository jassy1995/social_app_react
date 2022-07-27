import React from "react";
import { Link } from "react-router-dom";
// import Footer from "components/Footer";

// import Image from "assets/img/house-banner.png";
const Image =
  "https://english.cdn.zeenews.com/sites/default/files/styles/zm_700x400/public/2020/12/25/907391-housing-pixabat.jpg";

const Banner = () => {
  return (
    <section className="h-full max-h-[400px] mb-8 xl:mb-24 lg:mt-28 mt-20">
      <div className="flex flex-col-reverse space-y-0 lg:flex-row  md:pt-0">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0 mt-4 md:mt-12  lg:mt-0">
          <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-2 md:mb-6">
            <span className="text-violet-700">Rent</span> Your Dream House With
            Us.
          </h1>
          <p className="max-w-[480px] mb-4 mt-0 md:mb-10">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more.
          </p>
          <div className="text-center md:text-left mb-2">
            <Link to="/property">
              <button className="bg-violet-600 font-mono hover:bg-violet-700 text-white px-4 py-3 w-48 rounded-full">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-end items-end lg:max-h-[600px]">
          <img
            src={Image}
            alt=""
            className="h-[300px]   sm:h-[500px] sm:w-full md:rounded-tl-[90px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
