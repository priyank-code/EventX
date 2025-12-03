const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db.js");

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

// Database Connection
connectDB();

// Serve Static Frontend Files
// Points to the sibling 'client' folder's dist directory
const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Catch-all Route (For React Router)
app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Global Error Handling
process.on("unhandledRejection", (err) => {
    console.error("🔥 Unhandled Promise Rejection:", err);
    process.exit(1);
});