import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FetchImages() {
  const [showdata, setdata] = useState([]);
  const [sportName, setSportName] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:8080/GetAllImage")
      .then((response) => setdata(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredImages =
    sportName === "All"
      ? showdata
      : showdata.filter((image) => image.sportImageName === sportName);

  return (
    <div className="bg-black min-h-screen text-white px-6 py-10">

      <h1 className="text-center text-4xl font-bold mb-10">
        Get Your Sport Invitation
      </h1>

      <div className="max-w-xs mx-auto mb-8">
        <select
          value={sportName}
          onChange={(e) => setSportName(e.target.value)}
          className="w-full p-3 bg-black border border-white rounded-lg text-white focus:outline-none focus:border-red-500"
        >
          <option value="All">All</option>

          {[
            "Kabaddi",
            "Kho-Kho",
            "Wrestling",
            "Football",
            "Cricket",
            "Volleyball",
            "Badminton",
          ].map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <div key={image.id} className="text-center">
              <img
                src={`data:${image.type};base64,${image.contain}`}
                alt={image.name}
                className="w-[350px] h-[350px] object-cover rounded-xl shadow-lg border border-white/20"
              />

              <a
                href={`data:${image.type};base64,${image.contain}`}
                download={image.name}
                className="inline-block mt-4 px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold"
              >
                Download
              </a>
            </div>
          ))
        ) : (
          <h3 className="text-xl text-gray-300">No Images Available</h3>
        )}
      </div>
    </div>
  );
}
