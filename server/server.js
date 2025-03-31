const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Example API endpoint
app.get("/api/message", (req, res) => {
    
    res.json({
        message: `Hello from Node.js backend!`,
        keys: "nothing"
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});