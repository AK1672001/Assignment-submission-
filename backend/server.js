const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
const userrouter = require("./Router/userrouter");
const adminrouter = require("./Router/adminrouter");
const dotenv = require("dotenv");
dotenv.config();
const server = express();
server.use(express.json());

server.use(
  cors({
    origin: ["http://localhost:3000",'https://assignment-submission-1-8r8o.onrender.com'],
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


const dirname=path.resolve();
server.use(express.static(path.join(dirname,'/frontend/build')));
server.get("*",(req,res)=>{
    res.sendFile(path.join(dirname,"frontend",'build','index.html'))
})