import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserPanel() {
  const [matches, setMatches] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/")
      .then((res) => setMatches(res.data))
      .catch((err) => console.log(err));
  };

  const userMatches = matches.filter((m) => m.email === email);

  const openModal = (item) => {
    setSelected(item);
    setFormData(item);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  const changeField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateMatch = async () => {
    try {
      await axios.put(`http://localhost:8080/put/${selected.id}`, formData);
      alert("Updated successfully!");
      closeModal();
      fetchData();
    } catch (e) {
      alert("Update failed");
    }
  };

  const deleteMatch = async (id) => {
    if (!window.confirm("Delete this match?")) return;
    try {
      await axios.delete(`http://localhost:8080/Delete/${id}`);
      alert("Deleted!");
      fetchData();
    } catch (e) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-center text-3xl font-bold mb-6 text-red-500">
        Your Matches
      </h1>

      {userMatches.length === 0 ? (
        <p className="text-center text-gray-300 text-lg mt-10">
          No matches found for this user.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {userMatches.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 border border-white/20 rounded-xl p-4"
            >
              <h2 className="text-xl font-bold text-red-400 text-center">
                {item.sport_Name}
              </h2>

              <div className="mt-3 space-y-1 text-sm">
                <p><b>Date:</b> {item.date}</p>
                <p><b>Contact:</b> {item.contact_number}</p>
                <p><b>1st Prize:</b> ₹{item.first_Prize}</p>
                <p><b>2nd Prize:</b> ₹{item.second_prize}</p>
                <p><b>3rd Prize:</b> ₹{item.third_prize}</p>
                <p><b>Address:</b> {item.adress}</p>
                <p><b>Description:</b> {item.description}</p>
                <p><b>Entry Fee:</b> ₹{item.entryFrres}</p>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-4">
                <button
                  className="w-1/2 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white"
                  onClick={() => openModal(item)}
                >
                  Update
                </button>

                <button
                  className="w-1/2 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-600 hover:text-white"
                  onClick={() => deleteMatch(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black w-96 p-6 rounded-xl shadow-2xl">

            <h2 className="text-xl font-bold mb-4">Update Match</h2>

            <div className="space-y-3">
              <input className="input-box" name="sport_Name" value={formData.sport_Name} onChange={changeField} placeholder="Sport Name" />
              <input className="input-box" name="date" value={formData.date} onChange={changeField} placeholder="Date" />
              <input className="input-box" name="contact_number" value={formData.contact_number} onChange={changeField} placeholder="Contact Number" />
              <input className="input-box" name="first_Prize" value={formData.first_Prize} onChange={changeField} placeholder="First Prize" />
              <input className="input-box" name="second_prize" value={formData.second_prize} onChange={changeField} placeholder="Second Prize" />
              <input className="input-box" name="third_prize" value={formData.third_prize} onChange={changeField} placeholder="Third Prize" />
              <input className="input-box" name="adress" value={formData.adress} onChange={changeField} placeholder="Address" />
              <input className="input-box" name="description" value={formData.description} onChange={changeField} placeholder="Description" />
              <input className="input-box" name="entryFrres" value={formData.entryFrres} onChange={changeField} placeholder="Entry Fee" />
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700"
              onClick={updateMatch}
            >
              Save Changes
            </button>

            <button
              className="w-full bg-gray-300 text-black py-2 mt-2 rounded-lg hover:bg-gray-400"
              onClick={closeModal}
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
