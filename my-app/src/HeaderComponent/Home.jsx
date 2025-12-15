import React, { useEffect, useState } from 'react';
import HighpaidMatches from '../Pages/HighpaidMatches';
import NewsAPi from '../Pages/NewsApi';

export default function Home() {
  const [matchData, setMatchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch('http://localhost:8080/')
      .then((response) => response.json())
      .then((finalData) => {
        setMatchData(finalData);
        setFilteredData(finalData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleWhatsAppClick = (contactNumber) => {
  if (user) {
    const tournament = matchData.find(item => item.contact_number === contactNumber);

    if (!tournament) {
      alert("Tournament not found!");
      return;
    }

    const message =
      `Hello, I am ${user.name}!\n\n` +
      `I am interested in your tournament:\n` +
      `🏆 Sport: ${tournament.sport_Name}\n` +
      `📅 Date: ${tournament.date}\n` +
      `📍 Location: ${tournament.location}\n` +
      `🏠 Address: ${tournament.adress}`;

    const whatsappURL = `https://wa.me/91${contactNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  } else {
    alert("Please login first to contact via WhatsApp.");
  }
};


  const handelPrize = () => {
    setFilteredData(matchData.filter((item) => item.first_Prize > 50000).slice(0, 8));
  };

  const handelAllData = () => {
    setFilteredData(matchData.slice(0, 8));
  };

  const tomorrow = () => {
    const today = new Date();
    const tomorrowDate = new Date(today);
    tomorrowDate.setDate(today.getDate() + 1);
    const tomorrowString = tomorrowDate.toISOString().split('T')[0];

    setFilteredData(matchData.filter((item) => item.date === tomorrowString).slice(0, 8));
  };

  const filterBySport = (sport) => {
    setFilteredData(
      matchData.filter((item) => item.sport_Name === sport).slice(0, 8)
    );
  };

  const buttonList = [
    { spname: 'All Match', onClick: handelAllData },
    { spname: 'High Prize', onClick: handelPrize },
    { spname: 'Tomorrow', onClick: tomorrow },
    { spname: 'Cricket', onClick: () => filterBySport('Cricket') },
    { spname: 'Football', onClick: () => filterBySport('Football') },
    { spname: 'Kabaddi', onClick: () => filterBySport('Kabaddi') },
    { spname: 'Basketball', onClick: () => filterBySport('Basketball') },
  ];

  return (
    <div className="bg-black text-white">

      <div className="flex flex-wrap gap-3 justify-center mt-5 mb-5">
        {buttonList.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className="px-4 py-2 bg-red-600 rounded-md font-semibold text-white hover:bg-white hover:text-black transition shadow-md"
          >
            {btn.spname}
          </button>
        ))}
      </div>

      <h1 className="text-center text-4xl font-serif mb-4 text-white">Upcoming Matches</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {filteredData.slice(0, 8).map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur border border-white rounded-lg p-5 shadow-lg"
          >
            <h2 className="text-center text-2xl text-green-400 font-bold mb-3">
              {item.sport_Name}
            </h2>

            <p>Date: {item.date || 'TBD'}</p>
            <p>First Prize: ₹{item.first_Prize}</p>
            <p>Second Prize: ₹{item.second_prize}</p>
            <p>Third Prize: ₹{item.third_prize}</p>

            <p>
              Contact:{' '}
              {user ? item.contact_number : <span className="text-red-400">Login first</span>}
            </p>

            <p>Reporting Time: {item.reportin_Time || 'TBD'}</p>
            <p>Entry Fees: {item.entryFrres || '0'}</p>
            <p>*Highest Age: {item.age} Years</p>
            <p>*Highest Weight: {item.weight} Kg</p>

            <button
              onClick={() => window.open(item.location, '_blank')}
              className="w-full mt-2 border border-white py-2 rounded-md hover:bg-gray-600 transition"
            >
              View Location
            </button>

            <p className="mt-2">Address: {item.adress}</p>

            <details className="mt-3 border border-white p-3 rounded-md">
              <summary className="cursor-pointer text-lg font-semibold">Terms & Conditions</summary>
              <p className="mt-2">{item.description}</p>
            </details>

            <button
              onClick={() => handleWhatsAppClick(item.contact_number)}
              className="bg-green-600 w-full mt-4 py-2 rounded-md font-bold hover:bg-green-700"
            >
              Contact via WhatsApp
            </button>
          </div>
        ))}
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="flex justify-center mt-10 mb-10">
        <a
          href="/find"
          className="px-8 py-3 bg-blue-600 rounded-lg text-white font-bold text-lg hover:bg-blue-500 transition"
        >
          View All Tournaments →
        </a>
      </div>

      <HighpaidMatches />
      <NewsAPi />

    </div>
  );
}
