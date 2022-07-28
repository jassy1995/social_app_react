import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "pages/Home/Home";
import Profile from "pages/Profile/Profile";
import LoginPage from "pages/Login/Login";
import RegisterPage from "pages/Register/Register";
import NotFoundPage from "pages/NotFound";
import AuthGuard from "components/guards/auth";
import ScrollPage from "pages/scroll";
import Messager from "pages/Messager/Messager";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" limit={1} />
      <div className="max-w-[1600px] mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <AuthGuard>
                <HomePage />
              </AuthGuard>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />
          <Route
            path="/messager"
            element={
              <AuthGuard>
                <Messager />
              </AuthGuard>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/scroll" element={<ScrollPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
