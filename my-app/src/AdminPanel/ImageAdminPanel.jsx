import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ImageAdminPanel() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/GetAllImage")
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteImage = (id) => {
    axios
      .delete(`http://localhost:8080/DeleteImage/${id}`)
      .then(() => setImages((prev) => prev.filter((img) => img.id !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-5 bg-black-100 min-h-screen">

      <h1 className="text-3xl text-center font-bold text-red-600 mb-6 p-6">
        Image Admin Panel
      </h1>

      {images.length === 0 ? (
        <p className="text-gray-600 text-lg">No Images Found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300"
            >
              <img
                src={`data:${image.type};base64,${image.contain}`}
                alt={image.name}
                className="w-full h-72 object-cover"
              />

              <button
                onClick={() => deleteImage(image.id)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 font-semibold"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
