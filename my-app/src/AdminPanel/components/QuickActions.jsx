import React from "react";
import { Link } from "react-router-dom";

export default function QuickActions({ onRefresh }) {
  return (
    <div className="col-span-1 bg-white rounded-xl shadow p-5 flex flex-col">
      <h3 className="font-semibold text-lg">Quick Actions</h3>

      <div className="mt-4 space-y-3">

        <Link
          to="/Addtournament"
          className="block w-full text-center py-2 bg-red-600 hover:bg-red-500 rounded text-white font-semibold transition"
        >
          ➕ Add Tournament
        </Link>

        <Link
          to="/ImageAdmin"
          className="block w-full text-center py-2 bg-gray-800 hover:bg-gray-700 rounded text-white font-semibold transition"
        >
          🖼️ Manage Images
        </Link>

        <button
          onClick={onRefresh}
          className="w-full py-2 bg-white border border-gray-300 rounded font-semibold hover:bg-gray-100 transition"
        >
          🔄 Refresh Data
        </button>

        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to logout?")) {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }
          }}
          className="w-full py-2 bg-black text-white rounded hover:bg-gray-900 font-semibold transition"
        >
          🚪 Logout
        </button>

      </div>
    </div>
  );
}
