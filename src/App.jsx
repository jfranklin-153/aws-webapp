import React, { useState, useEffect } from "react";
import { NavBar } from "./components/Fun.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact, { ContactMe } from "./pages/Contact";

const App = () => {
    return (
      <div>
        <NavBar/>
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
