import React, { useState, useEffect } from "react";
import { NavBar } from "./components/Fun.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact, { ContactMe } from "./pages/Contact";
import "./App.css"

const App = () => {
    return (
      <div>
        <div class="navbar-container">
          <NavBar/>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="contact" element={<><Contact /><ContactMe/></>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
