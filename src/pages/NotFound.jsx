import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const styleLoader = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "fixed",
    left: "0px",
    top: "268px",
    width: "100%",
    height: "26%",
  };

  const logout = () => {
    console.log("logout");
    navigate("/");
  };
  return (
    <>
      <div className="h-[605px] md:h-[615px]">
        <div style={styleLoader} className="fs-3">
          <div className="pl-4 ml-4  text-slate-400">
            <div className="flex flex-col items-center">
              <h1 className="text-red-500 text-center text-3xl">
                Page not found
              </h1>
              <button
                className="text-blue-500 hover:underline text-lg"
                onClick={logout}
              >
                back to home page
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
