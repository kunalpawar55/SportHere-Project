import React from "react";
import { Link } from "react-router-dom";

export default function RecentMatches({ matches }) {
  const recent = matches.slice(-6).reverse();

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex justify-between">
        <h3 className="font-semibold">Recent Matches</h3>
        <Link to="/admin" className="text-sm text-blue-600">Manage</Link>
      </div>

      <ul className="mt-4 divide-y">
        {recent.map((m, i) => (
          <li key={i} className="py-3 flex justify-between">
            <div>
              <div className="font-medium">{m.sport_Name}</div>
              <div className="text-xs text-gray-500">{m.date}</div>
            </div>
            <div className="text-xs">₹{m.first_Prize}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
