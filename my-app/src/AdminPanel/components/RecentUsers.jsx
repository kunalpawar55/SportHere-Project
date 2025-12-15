// RecentUsers.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function RecentUsers({ users }) {
  const recent = users.slice(-5).reverse();

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex justify-between">
        <h3 className="font-semibold">Recent Users</h3>
        <Link to="/user" className="text-sm text-blue-600">See all</Link>
      </div>

      <ul className="mt-4 divide-y">
        {recent.map((u, i) => (
          <li key={i} className="py-3">
            <div className="font-medium">{u.fullName || u.name}</div>
            <div className="text-xs text-gray-500">{u.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
