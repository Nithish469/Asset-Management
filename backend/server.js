const express = require("express");
const cors = require("cors");

// Sequelize connection
const sequelize = require("./config/sequelize");

// Import routes

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const assetRoutes = require("./routes/assetRoutes");
const assignmentRoutes =require("./routes/assignmentRoutes");
const dashboardRoutes =require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", assetRoutes);
app.use("/api/admin",assignmentRoutes);
app.use("/api/admin",dashboardRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend Running with Sequelize");
});

// Database sync and start server
sequelize.sync({alter:true})
.then(() => {
  console.log("Database synced successfully");

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });

})
.catch((error) => {
  console.error("Unable to connect to database:", error);
});