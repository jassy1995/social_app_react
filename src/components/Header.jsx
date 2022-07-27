import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import useGlobalStore from "store/global";

const Header = ({ title }) => {
  const { formIsOpen, toggleTaskFormOpen } = useGlobalStore((state) => ({
    formIsOpen: state.data.formIsOpen,
    toggleTaskFormOpen: state.toggleTaskFormOpen,
  }));

  return (
    <div className="flex justify-between items-center px-2 py-2  ring-1 ring-purple-400">
      <h1 className="capitalize font-mono">{title}</h1>
      <Button handleClick={toggleTaskFormOpen}>
        {formIsOpen ? "Close" : "Add"}
      </Button>
    </div>
  );
};

Header.defaultProps = {
  title: "task-manager",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
