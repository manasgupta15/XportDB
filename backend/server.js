require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const connectDB = require("./config/db");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Dynamically load frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// connectDB();

// Routes
app.use("/api/files", fileRoutes);

// ✅ Handle root route to prevent 404 error
app.get("/", (req, res) => {
  res.send("XportDB Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
