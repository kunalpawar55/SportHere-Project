import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitch, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div className="bg-black text-white mt-10 py-10 border-t border-gray-800">
      
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold">
          SportsHere<span className="text-red-600">.com</span>
        </h1>
      </div>

      <footer className="flex justify-center">
        <ul className="flex flex-wrap gap-6 text-lg">
          <li><Link className="hover:text-red-500 transition" to="/">Home</Link></li>
          <li><Link className="hover:text-red-500 transition" to="/Find">Find</Link></li>
          <li><Link className="hover:text-red-500 transition" to="/about">About Us</Link></li>
          <li><Link className="hover:text-red-500 transition" to="/contact">Contact Us</Link></li>
          <li><Link className="hover:text-red-500 transition" to="/Sign-up">Sign Up</Link></li>
          <li><Link className="hover:text-red-500 transition" to="/Addtournament">Add Tournament</Link></li>
        </ul>
      </footer>

      <div className="flex justify-center mt-6 space-x-6">
        <a href="https://www.instagram.com/your_profile" target="_blank">
          <FontAwesomeIcon icon={faInstagram} size="2x" className="hover:text-pink-500 transition" />
        </a>

        <a href="https://wa.me/your_number" target="_blank">
          <FontAwesomeIcon icon={faWhatsapp} size="2x" className="hover:text-green-400 transition" />
        </a>

        <a href="https://twitter.com/your_profile" target="_blank">
          <FontAwesomeIcon icon={faTwitter} size="2x" className="hover:text-blue-400 transition" />
        </a>

        <a href="https://www.twitch.tv/your_channel" target="_blank">
          <FontAwesomeIcon icon={faTwitch} size="2x" className="hover:text-purple-500 transition" />
        </a>
      </div>

      <div className="text-center mt-6 text-red-500">
        All rights reserved © 2025 SportsHere.com
      </div>

    </div>
  );
}
