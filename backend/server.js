const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userrouter = require("./Router/userrouter");
const adminrouter = require("./Router/adminrouter");
const dotenv = require("dotenv");
dotenv.config();
const server = express();
server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials:true
  })
);
// MongoDB connection
mongoose
  .connect(process.env.MONGO, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

server.use(userrouter);
server.use(adminrouter);
server.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
