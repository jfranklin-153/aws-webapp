const cors = require("cors");
const express = require("express");
const fs = require("fs");
const { MongoClient } = require("mongodb");

const app = express();

// Get the config - add error handling
let config;
try {
    const rawConfig = fs.readFileSync("./config/mongodb.json");
    config = JSON.parse(rawConfig);
} catch (error) {
    console.error("Failed to read config:", error);
    process.exit(1);
}

// MongoDB connection setup
const mongoDbUri = config.connectionString;
// New code (MongoDB Driver 4.0+)
const client = new MongoClient(mongoDbUri);

let db;
let moviesCollection;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB on startup
async function connectToMongoDb() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db('sample_mflix');
        moviesCollection = db.collection('movies');
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
});

// Improved message endpoint with error handling
app.get("/api/message", async (req, res) => {
    try {
        const data = await moviesCollection.findOne();
        res.json({
            message: "Hello from Node.js backend!",
            data: data.plot || {}
        });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login endpoint placeholder
app.post("/api/login", (req, res) => {
    // Implement proper authentication logic here
    res.status(501).json({
        message: "Login endpoint not yet implemented"
    });
});

// Graceful shutdown
process.on("SIGINT", async () => {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit();
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToMongoDb();
});
