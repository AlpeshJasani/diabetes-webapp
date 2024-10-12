const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Import dotenv for environment variables
import path from "path";

// Import routes
const predictRoute = require("./routes/predict.js");
const authRoute = require("./routes/auth.js");
const historyRoutes = require("./routes/history.js");

// Load environment variables
dotenv.config(); // Load variables from .env file

// Create the Express app
const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
// app.use(cors());  // Enable CORS
app.use(cors());

app.use(bodyParser.json()); // Parse incoming JSON data

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api/predict", predictRoute); // Mount the prediction route at /api/predict
app.use("/api/auth", authRoute); // Mount the auth routes at /api/auth
app.use("/api", historyRoutes); // This adds the history route to the API

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server on port 5000
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
