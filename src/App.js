import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Footer from "./components/Footer";
import Particle from "./components/Particle";
import Image from "./Image";
import Register from "./components/auth/Register";
import Play from "./components/play/Play";
// import Playc from "./components/play/Playc";
import Hehe from "./components/about/Hehe";
import TitleSpons from "./components/TitleSpons";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/auth/Login";
import Profile from "./components/Profile";
// import Admin from "./components/Admin";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Particle />
        <Image />
        <TitleSpons />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="/play" element={<Playc />} /> */}
          <Route path="/play" element={<Play />} />
          <Route path="/sbtskmkc" element={<Hehe />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
