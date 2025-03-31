import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({
    message: "",
    keys: ""
  });

  useEffect(() => {
    fetch("/api/message")
      .then((response) => response.json())
      .then((data) => {
        setData({
          message: data.message,
          keys: data.keys
        })
      });
  }, []);

  return (
    <div>
      <h1>{data.message}</h1>
      <p>Keys: {data.keys}</p>
    </div>
  );
}

export default App
