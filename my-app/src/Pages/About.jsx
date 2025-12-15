import React from "react";
import virat from "../Images/virat.jpg";
import virat2 from "../Images/virat2.jpg";

export default function About() {
  return (
    <div className="bg-black text-white px-6 py-10">

      <h1 className="text-center text-4xl font-serif font-bold mb-12">
        About Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        <div>
          <h2 className="text-3xl font-bold leading-snug">
            Welcome to <span className="text-red-600">SportsHere.in</span>
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            At SportsHere.com, we provide a seamless and efficient platform for
            tournament organizers and sports enthusiasts to register, manage,
            and participate in various tournaments with ease.
          </p>

          <h2 className="text-3xl font-bold mt-10 leading-snug">Our Mission</h2>
          <p className="mt-3 text-lg leading-relaxed text-gray-300">
            Our mission is to simplify the tournament management process by
            offering an intuitive platform that helps organizers promote their
            events and allows players to discover and join tournaments
            effortlessly.
          </p>

          <h2 className="text-3xl font-bold mt-10 leading-snug">
            What We Offer
          </h2>

          <ul className="space-y-3 mt-3 text-lg text-gray-200">
            <li>✅ Tournament Registration – Easily register your tournaments.</li>
            <li>✅ Match Management – Manage schedules & prize money.</li>
            <li>✅ Search & Join – Players can discover tournaments.</li>
            <li>✅ Admin Panel – For verifying tournaments & managing data.</li>
            <li>✅ Easy Communication – Contact organizers directly via WhatsApp.</li>
          </ul>
        </div>

        <div className="flex justify-center md:justify-start items-start">
          <img
            src={virat2}
            alt="Virat"
            className="w-full max-w-[450px] h-[550px] rounded-xl shadow-2xl border border-gray-700 "
          />
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 items-start">

        <div className="flex justify-center md:justify-start">
          <img
            src={virat}
            alt="Virat 2"
            className="w-full max-w-[350px] h-[450px] object-cover rounded-xl shadow-2xl border border-gray-700"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold leading-snug">Why Choose Us?</h2>

          <ul className="space-y-3 mt-4 text-lg text-gray-200">
            <li>🚀 User-Friendly Interface – Simple and easy-to-use.</li>
            <li>📅 Efficient Scheduling – Everything is automated.</li>
            <li>📢 Wider Reach – More players for your tournament.</li>
            <li>🔒 Secure & Reliable – Your data is safe with us.</li>
            <li className="text-green-400 font-bold mt-4">
              🎉 Join SportsHere.com today and take your tournament experience to
              the next level!
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
