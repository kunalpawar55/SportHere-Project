// MatchesTable.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function MatchesTable({ matches, deleteMatch }) {
  return (
    <div className="mt-6 bg-white rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold mb-4">All Matches</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="text-xs text-gray-500 uppercase">
            <th className="py-2 px-3">Sport</th>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Prize</th>
            <th className="py-2 px-3">Contact</th>
            <th className="py-2 px-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {matches.map((m, i) => (
            <tr key={i} className="border-t">
              <td className="py-3">{m.sport_Name}</td>
              <td>{m.date}</td>
              <td>₹{m.first_Prize}</td>
              <td>{m.contact_number}</td>
              <td>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => deleteMatch(m.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
