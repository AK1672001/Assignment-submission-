const User = require("../Models/user");
const Assignment = require("../Models/assignment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose=require("mongoose")
dotenv.config();
const register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const data = await User.findOne({ email });
    if (data)
      return res.status(404).json({ msg: "email already exist" });
    const hashpassword = await bcrypt.hash(password, 10);
    const admin = new User({
      username,
      password: hashpassword,
      email,
      role: "admin",
    });
    await admin.save();
    return res
      .status(200)
      .json({ message: "admin registered successfully", admin });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


const adminassignment = async (req, res) => {
  try {
    const {adminId} = req.params;
    console.log("adminId>>",adminId)  
    const adminObjectId = new mongoose.Types.ObjectId(adminId);
    const assignments = await Assignment.find({admin:adminId }).populate('admin', 'username email'); 
    console.log("assignment",assignments)
    if (!assignments || assignments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No assignments found for this admin"
      });
    }
    res.status(200).json({
      success: true,
     msg:"successfully upload assignment", assignments
    });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch assignments"
    });
  }
};
const adminassignmentaccept = async (req, res) => {
  const { id } = req.params;
  await Assignment.findByIdAndUpdate(id, { status: "accepted" });
  res.status(200).json({ message: "Assignment accepted" });
};
const adminassignmentreject = async (req, res) => {
  const { id } = req.params;
  await Assignment.findByIdAndUpdate(id, { status: "rejected" });
  res.status(200).json({ message: "Assignment rejected" });
};
module.exports = {
  register,
  adminassignment,
  adminassignmentaccept,
  adminassignmentreject,
  
};
