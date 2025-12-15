import React from "react";
import { sportData } from "../SportsmanData/Sportdata";

export default function NewsAPi() {
  return (
    <div className="p-4 bg-gradient-to-r from-black via-black/90 to-red-700/80">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">

        {sportData.map((item, index) => (
          <div
            key={index}
            className="w-[280px] bg-black/40 backdrop-blur-md text-white rounded-2xl shadow-[0_0_12px_white]"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded-t-2xl"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold">{item.name}</h2>

              <p className="text-sm mt-1">
                <strong>Sport:</strong> {item.sport}
              </p>

              <p className="text-sm">
                <strong>Nickname:</strong> {item.nickname}
              </p>

              <p className="text-sm">
                <strong>Country:</strong> {item.country}
              </p>

              <p className="text-sm font-semibold mt-3">Achievements:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {item.achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>

              <p className="text-sm mt-3">
                <strong>Biopic:</strong> {item.biopic}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
