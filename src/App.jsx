import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./global.css";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProfile from "./pages/UpdateProfile";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
          <Route path="/updateprofile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>}/>
          <Route path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
