import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/footer";

function Index() {
  return (
    <>
      <Navbar logo="Task" />
      <Outlet />
      <Footer logo="Task" />
    </>
  );
}
export default Index;
