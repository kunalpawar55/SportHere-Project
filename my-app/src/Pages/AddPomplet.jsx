import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPomplate() {
  const [file, setFile] = useState(null);
  const [sportName, setSportName] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const email = user ? user.email : null;

  const handleUpload = async () => {
    if (!file || !sportName) {
      alert("Please select image & sport name.");
      return;
    }

    try {
      if (user) {
        const formData = new FormData();
        formData.append("Doc", file);
        formData.append("sportname", sportName);
        formData.append("emailadress", email);
        const { data } = await axios.post(
          "http://localhost:8080/UploadImage",  
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        alert("Image uploaded successfully!");
        navigate("/");
      } else {
        alert("Login First");
        navigate("/login");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-black to-red-700 text-white flex flex-col items-center px-6 py-10">
      
      <h1 className="text-4xl font-bold mb-10 text-white">
        Upload Tournament Poster
      </h1>

      <div className="w-full max-w-md flex flex-col gap-4 bg-black/40 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-lg">
        
        <label className="text-lg font-semibold">Select Sport</label>
        <select
          className="p-3 rounded-lg bg-black border border-white/30 text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
          value={sportName}
          onChange={(e) => setSportName(e.target.value)}
        >
          <option value="" className="text-gray-300">-- Select Sport --</option>
          {[
            "Kabaddi",
            "Kho-Kho",
            "Wrestling",
            "Football",
            "Cricket",
            "Volleyball",
            "Badminton",
          ].map((sport) => (
            <option key={sport} value={sport} className="text-white">
              {sport}
            </option>
          ))}
        </select>

        <label className="text-lg font-semibold mt-3">Select Image File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-white bg-black border border-white/30 p-2 rounded-lg cursor-pointer"
        />

        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 transition-all font-bold text-white py-3 rounded-lg shadow-lg"
        >
          Upload Image
        </button>
      </div>
    </div>
  );
}
