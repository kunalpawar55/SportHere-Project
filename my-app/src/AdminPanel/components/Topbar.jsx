// Topbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Topbar({ setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-black to-red-700 text-white px-4 py-3">
      <button onClick={() => setSidebarOpen(true)} className="text-2xl md:hidden">☰</button>

      <div>
        <span className="text-xl font-bold">SportsHere Admin</span>
        <div className="text-xs text-white/70">Dashboard Overview</div>
      </div>

      <div className="hidden md:flex gap-4">
        <Link to="/" className="hover:underline">View Site</Link>
      </div>
    </header>
  );
}
