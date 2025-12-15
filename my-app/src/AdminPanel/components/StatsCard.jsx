import React from "react";
import Sparkline from "./Sparkline";

export default function StatsCard({ title, value, trend, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
        <div className="text-sm text-gray-600">{trend}</div>
      </div>

      <div className="mt-3">
        <Sparkline data={[10, 40, 20, 60, 30]} stroke={color} />
      </div>
    </div>
  );
}
