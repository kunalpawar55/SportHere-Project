import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Contact() {
  const whatsapp = () => {
    const message = "Hello! I am interested in this tournament.";
    const whatsappURL = `https://wa.me/917719000398?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col justify-center items-center px-4">

      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="flex flex-col justify-center items-center bg-white/10 border border-white/10 p-10 rounded-xl shadow-xl">

        <FontAwesomeIcon
          icon={faWhatsapp}
          onClick={whatsapp}
          className="text-green-500 text-7xl cursor-pointer hover:scale-110 transition"
        />

        <h2 className="text-2xl mt-4 font-semibold">Contact on WhatsApp</h2>
      </div>

      <h5 className="mt-6 text-gray-300">Please click on WhatsApp logo</h5>
    </div>
  );
}
