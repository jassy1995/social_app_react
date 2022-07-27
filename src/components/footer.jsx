import React from "react";

import PropTypes from "prop-types";

function Footer({ logo }) {
  return (
    <div>
      <footer className="bg-blue-500 fixed bottom-0 right-0 left-0">
        <div className="container flex flex-col-reverse justify-between px-1 py-1 mx-auto space-y-1 md:flex-row md:space-y-0">
          <div className="flex flex-col-reverse items-center justify-between space-y-1 md:flex-col md:space-y-0 md:items-start">
            <div className="mx-auto  text-center text-white md:hidden">
              Copyright &copy; 2022 Manage. All rights reserved.
            </div>
            <div>
              <div className="font-thin text-xl text-white bg-myColor-transparent rounded-full md:capitalize md:first-letter:font-medium first-letter:text-2xl  md:first-letter:text-4xl first-letter:font-bold">
                {logo}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-around">
            <div className="hidden text-white md:block">
              Copyright &copy; 2022 Manage. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

Footer.defaultProps = {
  logo: "Wesabi",
};

Footer.propTypes = {
  logo: PropTypes.string,
};

export default Footer;
