import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './HeaderComponent/Header';
import Home from './HeaderComponent/Home';

import About from './Pages/About';
import Contact from './Pages/Contact';
import Find from './Pages/Find';
import Signup from './Pages/Signup';
import AddTournament from './Pages/AddTournament';
import Login from './Pages/Login';
import AdminPanel from './AdminPanel/AdminPanel';
import Getallpromp from './Pages/Getallpromp';
import User from './Pages/User';
import ImageAdminPanel from './AdminPanel/ImageAdminPanel.jsx';
import MyMatches from './Pages/MyMatches';
import Location from './Pages/Location';
import SmallChat from './Chatbox/SmallChat';
import Footer from './HeaderComponent/Footer';
import Userpanel from './UserPanel/Userpanel.jsx';
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find" element={<Find />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addtournament" element={<AddTournament />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/getpomp" element={<Getallpromp />} />
        <Route path="/user" element={<User />} />
        <Route path="/imageadmin" element={<ImageAdminPanel />} />
        <Route path="/userdashboard" element={<Userpanel />} />
        <Route path="/mymatches" element={<MyMatches />} />
        <Route path="/location" element={<Location />} />
        <Route path='/getallpromp' element={<Getallpromp/>}/>
      </Routes>
      <SmallChat/>
      <Footer />
    </>
  );
}

export default App;
