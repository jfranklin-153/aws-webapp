import React, { useState, useEffect } from "react";
import { NewApp } from "./components/Fun.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact, { ContactMe } from "./pages/Contact";

const App = () => {
  const [data, setData] = useState({
    message: "",
    routeDetails: ""
  });

  useEffect(() => {
    fetch("/api/message?test=Hi")
      .then((response) => response.json())
      .then((data) => {
        setData({
          message: data.message,
        })
      });
  }, []);

  return (
      <div>
        <p>Data message: {data.message}</p>
        <NewApp/>
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
