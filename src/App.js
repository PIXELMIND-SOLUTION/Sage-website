// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./views/ChatBot";

import Home from "./components/Home";
import ContactUs from "./pages/ContactUs";
import Careers from "./pages/Careers";
import AboutUs from "./pages/AboutUs";
import TalkToExperts from "./pages/TalkToxperts";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
        <Header isScrolled={isScrolled} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/talktoexperts" element={<TalkToExperts />} />
        </Routes>

        <Footer />
        <ChatBot />
      </div>
    </>
  );
}

export default App;
