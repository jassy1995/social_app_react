import React from "react";
import PropTypes from "prop-types";
import useGlobalStore from "store/global";

const Button = ({ handleClick, children }) => {
  const formIsOpen = useGlobalStore((state) => state.data.formIsOpen);
  return (
    <button
      className={`border-none outline-none rounded-full px-2 py-1 w-20 font-mono text-white ${
        formIsOpen ? "bg-red-500" : "bg-green-500"
      } `}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func,
};

export default Button;
