import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { MdHome, MdLogin, MdAddCircle } from "react-icons/md";
import {
  FaPhoneAlt,
  FaUsers,
  FaSearch,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";


export default function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name;

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <header className="w-full bg-gradient-to-r from-black to-red-900 px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white">
              SportsHere<span className="text-red-500">.com</span>
            </h1>
            {username && (
              <span className="text-gray-300 text-sm">Hello {username}</span>
            )}
          </div>

          <nav className="hidden md:flex gap-6 text-white font-semibold">
            <Link className="hover:text-red-400" to="/">Home</Link>
            <Link className="hover:text-red-400" to="/Contact">Contact Us</Link>
            <Link className="hover:text-red-400" to="/Find">Find</Link>
            <Link className="hover:text-red-400" to="/About">About Us</Link>
            <Link className="hover:text-red-400" to="/Signup">Sign Up</Link>
            <Link className="hover:text-red-400" to="/Login">Login</Link>
            <Link className="hover:text-red-400" to="/Addtournament">Add Tournament</Link>
            <Link className="hover:text-red-400" to="/GetPomp">Get Image</Link>

            {/* Logout Button */}
            <button
              className="hover:text-red-500"
              onClick={logout}
            >
              Logout
            </button>

            {/* User Dashboard Icon */}
            <button onClick={() => navigate("/userdashboard")}>
              <FaUser className="text-white text-xl hover:text-red-300" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setOpenDrawer(true)}
          >
            <HiMenu />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {openDrawer && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setOpenDrawer(false)}
          ></div>

          {/* Drawer Panel */}
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-50 p-5">
            <h2 className="text-center text-xl font-bold mb-5">Menu</h2>

            <ul className="space-y-4 text-lg">
              <li>
                <Link
                  to="/"
                  onClick={() => setOpenDrawer(false)}
                  className="flex items-center gap-3"
                >
                  <MdHome className="text-blue-600 text-xl" /> Home
                </Link>
              </li>

              <li>
                <Link
                  to="/Contact"
                  onClick={() => setOpenDrawer(false)}
                  className="flex items-center gap-3"
                >
                  <FaPhoneAlt className="text-blue-600" /> Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/Find"
                  onClick={() => setOpenDrawer(false)}
                  className="flex items-center gap-3"
                >
                  <FaSearch className="text-blue-600" /> Find
                </Link>
              </li>

              <li>
                <Link
                  to="/About"
                  onClick={() => setOpenDrawer(false)}
                  className="flex items-center gap-3"
                >
                  <FaUsers className="text-blue-600" /> About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/Sign-up"
                  onClick={() => setOpenDrawer(false)}
                  className="flex items-center gap-3"
                >
                  <MdLogin className="text-blue-600" /> Sign Up
                </Link>
              </li>

              <li>
                <Link
                  to="/Login"
                  onClick={() => setOpenDrawer(false)}
                  className="flex items-center gap-3"
                >
                  <MdLogin className="text-blue-600" /> Login
                </Link>
              </li>

              <li>
                <Link
                  to="/Addtournament"
                  onClick={() => setOpenDrawer(false)}
                  className="flex items-center gap-3"
                >
                  <MdAddCircle className="text-blue-600" /> Add Tournament
                </Link>
              </li>

              <li>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 text-red-500"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        </>
      )}

    
    </>
  );
}
