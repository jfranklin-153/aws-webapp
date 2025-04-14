import React, { useState, useEffect } from "react";
import { NavBar } from "./components/Fun.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact, { ContactMe } from "./pages/Contact";

const App = () => {
  const [data, setData] = useState({
    message: "",
    routeDetails: ""
  });

  useEffect(() => {
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data) => {
        setData({
          message: data.message,
          data: data.data
        })
      });
  }, []);

  return (
      <div>
        <NavBar/>
        <p>Data message: {data.message}</p>
        <p>Data: {data.data}</p>
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
