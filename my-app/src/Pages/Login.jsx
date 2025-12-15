import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      setMsg('User already logged in! Please logout first.');
      setMsgType('error');
      return;
    }

    axios
      .get('http://localhost:8080/get-all')
      .then((response) => {
        const users = response.data;

        const user = users.find(
          (u) =>
            u.email === email &&
            u.password === password &&
            u.user.toLowerCase() === 'user'
        );
        const admin = users.find(
          (u) =>
            u.email === email &&
            u.password === password &&
            u.user.toLowerCase() === 'admin'
        );

        if (user) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              role: 'user',
              email: user.email,
              name: user.fullName || 'User',
            })
          );

          setMsg(`Hello, ${user.fullName || 'User'}!`);
          setMsgType('success');
          setTimeout(() => navigate('/'), 1500);

        } else if (admin) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              role: 'admin',
              email: admin.email,
              name: admin.fullName || 'Admin',
            })
          );

          setMsg(`Hello, ${admin.fullName || 'Admin'}!`);
          setMsgType('success');
          setTimeout(() => navigate('/admin'), 1500);

        } else {
          setMsg('Invalid email or password! Please try again.');
          setMsgType('error');
        }
      })
      .catch(() => {
        setMsg('An error occurred while fetching data.');
        setMsgType('error');
      });
  };

  return (
    <div className="bg-black min-h-screen text-white">

      <div className="flex justify-center items-center mt-10 px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl p-8 rounded-2xl">

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-6 text-red-500">
            Login
          </h1>

          {/* Alert Box */}
          {msg && (
            <div
              className={`font-semibold p-3 rounded mb-4 text-center ${
                msgType === 'error'
                  ? 'bg-red-500/20 border border-red-400 text-red-300'
                  : 'bg-green-500/20 border border-green-400 text-green-300'
              }`}
            >
              {msg}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-gray-300 focus:border-white outline-none p-2 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                className="w-full bg-transparent border-b border-gray-300 focus:border-white outline-none p-2 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 mt-4 rounded-lg font-bold text-lg 
              bg-gradient-to-r from-red-700 to-black 
              hover:from-black hover:to-red-700 
              transition duration-500 shadow-md"
            >
              Login
            </button>
          </form>

          {/* SIGNUP LINK */}
          <p className="text-center mt-4 text-gray-300">
            Don't have an account?{" "}
            <span
              className="text-red-400 cursor-pointer hover:underline"
              onClick={() => navigate('/sign-up')}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

    </div>
  );
}
