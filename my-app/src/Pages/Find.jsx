import React, { useEffect, useState } from "react";

export default function Find() {
  const [matchData, setMatchData] = useState([]);
  const [showSearch, setShowSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [activeSport, setActiveSport] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const sports = [
    "Kabaddi",
    "Cricket",
    "Football",
    "Volleyball",
    "Wrestling",
    "Kho-Kho",
    "Badminton",
  ];

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => {
        setMatchData(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // SEARCH FILTER
  const handleSearch = () => {
    let filteredResult = matchData;

    if (showSearch.trim() !== "") {
      filteredResult = filteredResult.filter((item) =>
        item.sport_Name.toLowerCase().includes(showSearch.toLowerCase())
      );
    }

    if (activeSport !== "") {
      filteredResult = filteredResult.filter(
        (item) => item.sport_Name.toLowerCase() === activeSport.toLowerCase()
      );
    }

    setFiltered(filteredResult);
  };

  // SPORT BUTTON FILTER
  const filterBySport = (sport) => {
    setActiveSport(sport);
    setShowSearch("");
    const filteredResult = matchData.filter(
      (item) => item.sport_Name.toLowerCase() === sport.toLowerCase()
    );
    setFiltered(filteredResult);
  };

  const clearFilters = () => {
    setActiveSport("");
    setShowSearch("");
    setFiltered(matchData);
  };

  const handleWhatsAppClick = (contactNumber) => {
    const message = "Hello! I am interested in this tournament.";
    const url = `https://wa.me/91${contactNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-black min-h-screen text-white px-6 py-10">

      <h1 className="text-center text-4xl font-bold mb-8">Find Match</h1>

      {/* SPORT FILTER BUTTONS */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {sports.map((sport, index) => (
          <button
            key={index}
            onClick={() => filterBySport(sport)}
            className={`px-4 py-2 rounded-lg border font-semibold transition ${
              activeSport === sport
                ? "bg-red-600 text-white border-red-600"
                : "border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            {sport}
          </button>
        ))}

        {/* Clear All */}
        <button
          onClick={clearFilters}
          className="px-4 py-2 rounded-lg border border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-black"
        >
          Clear
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="max-w-3xl mx-auto flex gap-3 mb-10">
        <input
          type="text"
          className="flex-1 bg-transparent border border-white p-3 rounded-lg outline-none text-white placeholder-gray-400"
          placeholder="Search by sport name..."
          value={showSearch}
          onChange={(e) => setShowSearch(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-red-700 hover:bg-red-500 rounded-lg font-bold transition"
        >
          🔍
        </button>
      </div>

      {/* MATCH CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-red-500 mb-2">
              {item.sport_Name}
            </h2>

            <p>Date: {item.date || "TBD"}</p>
            <p>1st Prize: ₹{item.first_Prize}</p>
            <p>2nd Prize: ₹{item.second_prize}</p>
            <p>3rd Prize: ₹{item.third_prize}</p>
            <p>Contact: {item.contact_number}</p>
            <p>Reporting Time: {item.reportin_Time || "TBD"}</p>

            <p className="text-red-400">
              Highest Age: {item.age} Years
            </p>
            <p className="text-red-400">
              Highest Weight: {item.weight} Kg
            </p>

            <p>Address: {item.adress}</p>

            <details className="bg-black/20 mt-4 p-3 rounded-lg border border-white/20">
              <summary className="cursor-pointer text-lg font-bold">
                Terms & Conditions
              </summary>
              <p className="mt-2 text-gray-300">{item.description}</p>
            </details>

            {user ? (
              <button
                onClick={() => handleWhatsAppClick(item.contact_number)}
                className="w-full mt-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold transition"
              >
                📞 Contact via WhatsApp
              </button>
            ) : (
              <p className="mt-4 text-red-500 font-bold text-center">
                Please login to contact
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
