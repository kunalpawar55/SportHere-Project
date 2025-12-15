import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const logindata = {
      dob: dob.trim(),
      email: email.trim().toLowerCase(),
      fullName: fullname.trim(),
      number: mobile.trim(),
      password: password,
      user: "User",
    };

    if (password.length < 10) {
      setMsg("Password must be at least 10 characters!");
      setMsgType("error");
      setShowAlert(true);
      return;
    }

    if (mobile.length !== 10) {
      setMsg("Mobile number must be exactly 10 digits!");
      setMsgType("error");
      setShowAlert(true);
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.get("http://localhost:8080/get-all");
      const users = res.data;

      const exists = users.find((u) => u.email === email);

      if (!exists) {
        await axios.post("http://localhost:8080/Login", logindata);
        setMsg("Signup Successful! Redirecting...");
        setMsgType("success");
        setShowAlert(true);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setMsg("Email already registered!");
        setMsgType("error");
        setShowAlert(true);
      }
    } catch (err) {
      setMsg("Error occurred while signing up!");
      setMsgType("error");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-black min-h-screen flex justify-center items-center px-4 text-white">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl">

        <h1 className="text-center text-3xl font-bold text-red-500 mb-6">
          Sign Up
        </h1>

        {/* Alert Box */}
        {showAlert && (
          <div
            className={`p-3 rounded mb-4 font-semibold text-center ${
              msgType === "error"
                ? "bg-red-500/20 text-red-300 border border-red-400"
                : "bg-green-500/20 text-green-300 border border-green-400"
            }`}
          >
            {msg}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              type="text"
              className="w-full p-2 mt-1 bg-transparent border-b border-gray-400 focus:border-white outline-none text-white"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm font-semibold">Date of Birth</label>
            <input
              type="date"
              className="w-full p-2 mt-1 bg-transparent border-b border-gray-400 focus:border-white outline-none text-white"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-2 mt-1 bg-transparent border-b border-gray-400 focus:border-white outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="text-sm font-semibold">Mobile Number</label>
            <input
              type="number"
              className="w-full p-2 mt-1 bg-transparent border-b border-gray-400 focus:border-white outline-none text-white"
              placeholder="10-digit number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 bg-transparent border-b border-gray-400 focus:border-white outline-none text-white"
              placeholder="At least 10 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-bold text-lg
            bg-gradient-to-r from-red-700 to-black 
            hover:from-black hover:to-red-700 transition
            shadow-md mt-4 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
