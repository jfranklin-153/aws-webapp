const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const compression = require("compression");
const { MongoClient } = require("mongodb");
// use express for the app
const app = express();

// get environment variables
dotenv.config();
const PORT = process.env.PORT || 8000;

// MongoDB connection setup
const mongoDbUri = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(mongoDbUri, {
    maxPoolSize: 10
});

let db;
let moviesCollection;

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression());

// Middleware to ensure MongoDB connection is established
async function ensureDbConnection(req, res, next) {
    if (!client.topology || !client.topology.isConnected()) {
        try {
            await client.connect();
            console.log("Connected to MongoDB");
            db = client.db('sample_mflix');
            moviesCollection = db.collection('movies');
        } catch (error) {
            console.error("MongoDB connection error:", error);
            return res.status(500).json({ error: "Database connection error" });
        }
    }
    next();
}
app.use("/api/movies", ensureDbConnection);

// Async middleware wrapper
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
});

// Improved message endpoint with caching
let cachedMovieData = null;
let cacheTimeout = null;

app.get("/api/movies", asyncHandler(async (req, res) => {
    if (!cachedMovieData) {
        console.log("Fetching")
        const data = await moviesCollection.findOne();
        cachedMovieData = {
            message: "Hello from Node.js backend!",
            data: [data.title] || []
        };
        // Invalidate cache after 5 minutes
        cacheTimeout = setTimeout(() => {
            cachedMovieData = null;
        }, 5 * 60 * 1000);
    }
    res.json(cachedMovieData);
}));

// Login endpoint placeholder
app.post("/api/login", (req, res) => {
    res.status(501).json({
        message: "Login endpoint not yet implemented"
    });
});

// Graceful shutdown
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    server.close(async () => {
        await client.close();
        console.log("MongoDB connection closed");
        process.exit();
    });
});