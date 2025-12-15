import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
  activeSection,
  setActiveSection,
}) {
  return (
    <aside
      className={`fixed z-[9999] left-0 top-0 h-full w-64 bg-black text-white transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="p-4 border-b border-white/10">
        <div className="text-lg font-bold">Admin Menu</div>
      </div>

      <nav className="p-4 space-y-3">

        <div
          onClick={() => {
            setActiveSection("dashboard");
            setSidebarOpen(false);
          }}
          className={`px-3 py-2 rounded cursor-pointer ${
            activeSection === "dashboard" ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          📊 Dashboard
        </div>

        <div
          onClick={() => {
            setActiveSection("images");
            setSidebarOpen(false);
          }}
          className={`px-3 py-2 rounded cursor-pointer ${
            activeSection === "images" ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          🖼 Image Panel
        </div>

        <Link
          to="/"
          className="block px-3 py-2 rounded hover:bg-white/10"
        >
          🏠 Home
        </Link>

      </nav>

      <div className="mt-auto p-4 border-t border-white/10">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
