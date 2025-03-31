import React, { useState, useEffect } from "react";

function App() {
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
          routeDetails: data.routeDetails
        })
      });
  }, []);

  return (
    <div>
      <h1>{data.message}</h1>
      <p>{data.routeDetails}</p>
    </div>
  );
}

export default App
