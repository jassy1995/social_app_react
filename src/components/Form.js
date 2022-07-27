import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const FormContext = React.createContext({
  form: {},
});

function Form(props) {
  const { children, submit = () => {}, initialValues, loading } = props;

  const [form, setForm] = useState(initialValues);

  const location = useLocation();

  const handleResetForm = () => {
    setForm(initialValues);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <form className="mt-6">
        <FormContext.Provider
          value={{
            form,
            handleFormChange,
          }}
        >
          {children}
        </FormContext.Provider>
        {location.pathname !== "/signUp" && (
          <Link to="#" className="text-xs text-gray-600 hover:underline">
            Forget Password?
          </Link>
        )}

        <div className="mt-6">
          <button
            type="button"
            onClick={() => submit(form, handleResetForm)}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-violet-700 rounded-md hover:bg-violet-600 focus:outline-none focus:bg-violet-600"
            disabled={loading}
          >
            {location.pathname === "/signUp" && !loading
              ? "Sign Up"
              : location.pathname === "/login" && !loading
              ? "Login"
              : location.pathname === "/signUp" && loading
              ? "submitting..."
              : "login..."}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
