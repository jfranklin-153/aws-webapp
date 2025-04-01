const cors = require("cors");
const express = require("express");
const fs = require("fs");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
// Get the config
const rawConfig = fs.readFileSync("./config/mongodb.json");
const config = JSON.parse(rawConfig);
// Mongodb connection uri
const mongoDbUri = config.connectionString;

app.use(cors());
app.use(express.json());

// Example API endpoint
app.get("/api/message", (req, res) => {
    res.json({
        message: `Hello from Node.js backend!`
    });
});

app.post("/api/login", (req, res) => {
  res.json({
    message: `This is the login form -- to be created`
  })
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});