import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import AddPomplate from "./AddPomplet";

export default function AddTournament() {
  const [sportName, setSportName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ampm, setAmpm] = useState("");
  const [prizes, setPrizes] = useState({ first: "", second: "", third: "" });
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [description, setDescription] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [location, setLocation] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    if (location) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setGoogleMapsUrl(`https://www.google.com/maps?q=${latitude},${longitude}`);
        },
        () => alert("Location access denied.")
      );
    }
  }, [location]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      alert("Login First");
      return navigate("/login");
    }

    const data = {
      sport_Name: sportName,
      date,
      reportin_Time: time + ampm,
      first_Prize: prizes.first,
      second_prize: prizes.second,
      third_prize: prizes.third,
      contact_number: contact,
      adress: address,
      age,
      weight,
      description,
      entryFrres: entryFee,
      location: googleMapsUrl,
      email: email,
    };

    try {
      if (contact.length === 10 && time <= 12) {
        await axios.post("http://localhost:8080", data);
        alert("Tournament added successfully!");
        navigate("/");
      } else {
        alert("Enter valid values!");
      }
    } catch (error) {
      alert("Failed to add tournament");
    }
  }

  return (
    <div className="bg-black min-h-screen text-white">

      <div className="max-w-lg mx-auto mt-8 p-6 border border-white/50 rounded-xl shadow-xl bg-white/5 backdrop-blur">

        <h1 className="text-center text-3xl font-bold text-red-500 mb-6">
          🏆 Add Tournament
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* SPORT */}
          <div>
            <label className="text-sm font-semibold">Sport</label>
            <select
              className="w-full mt-1 bg-transparent border border-white p-2 rounded-md outline-none"
              value={sportName}
              onChange={(e) => setSportName(e.target.value)}
              required
            >
              <option value="" className="text-black">Select Sport</option>
              {["Kabaddi", "Kho-Kho", "Wrestling", "Football", "Cricket", "Volleyball", "Badminton"].map((sport) => (
                <option key={sport} value={sport} className="text-black">{sport}</option>
              ))}
            </select>
          </div>

          {/* DATE */}
          <div>
            <label className="text-sm font-semibold">Date</label>
            <input
              type="date"
              className="w-full mt-1 bg-transparent border border-white p-2 rounded-md outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* TIME */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-semibold">Reporting Time</label>
              <input
                type="number"
                className="w-full mt-1 bg-transparent border border-white p-2 rounded-md outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className="flex-1">
              <label className="text-sm font-semibold">AM/PM</label>
              <select
                className="w-full mt-1 bg-transparent border border-white p-2 rounded-md outline-none"
                value={ampm}
                onChange={(e) => setAmpm(e.target.value)}
                required
              >
                <option value="" className="text-black">Select</option>
                <option value="AM" className="text-black">AM</option>
                <option value="PM" className="text-black">PM</option>
              </select>
            </div>
          </div>

          {/* PRIZES */}
          <div className="flex gap-3">
            {["first", "second", "third"].map((p, idx) => (
              <div key={idx} className="flex-1">
                <label className="text-sm font-semibold">{idx + 1}st Prize</label>
                <input
                  type="number"
                  className="w-full mt-1 bg-transparent border border-white p-2 rounded-md outline-none"
                  value={prizes[p]}
                  onChange={(e) => setPrizes({ ...prizes, [p]: e.target.value })}
                  required
                />
              </div>
            ))}
          </div>

          {/* CONTACT */}
          <div>
            <label className="text-sm font-semibold">Contact Number</label>
            <input
              type="number"
              className="w-full mt-1 bg-transparent border border-white p-2 rounded-md outline-none"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-sm font-semibold">Address</label>
            <input
              type="text"
              className="w-full mt-1 bg-transparent border border-white p-2 rounded-md outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* AGE + WEIGHT */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-semibold">Age</label>
              <input
                type="number"
                className="w-full mt-1 bg-transparent border border-white p-2 rounded-md outline-none"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label className="text-sm font-semibold">Weight</label>
              <input
                type="number"
                className="w-full mt-1 bg-transparent border border-white p-2 rounded-md outline-none"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          {/* ENTRY FEE */}
          <div>
            <label className="text-sm font-semibold">Entry Fee</label>
            <input
              type="number"
              className="w-full mt-1 bg-transparent border border-white p-2 rounded-md outline-none"
              value={entryFee}
              onChange={(e) => setEntryFee(e.target.value)}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-semibold">Description</label>
            <textarea
              className="w-full mt-1 bg-transparent border border-white p-2 rounded-md outline-none"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* LOCATION */}
          <button
            type="button"
            onClick={() => setLocation(true)}
            className="w-full border border-white py-2 rounded-md hover:bg-white hover:text-black transition"
          >
            📍 Get Current Location
          </button>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full mt-3 py-2 text-lg font-bold rounded-md 
            bg-gradient-to-r from-red-700 to-black hover:from-black hover:to-red-700 transition"
          >
            Submit
          </button>

        </form>
      </div>

      <AddPomplate />
    </div>
  );
}
