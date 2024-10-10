const {register,adminassignment,adminassignmentaccept,adminassignmentreject}=require("../Controller/admincontroller");
const express=require("express");
const Auth=require("../Middleware/Auth")
const adminrouter=express.Router();

adminrouter.post("/admin/register",register);

adminrouter.get("/admin/assignment/:adminId",adminassignment);
adminrouter.post("/admin/assignment/:id/accept",adminassignmentaccept);
adminrouter.post("/admin/assignment/:id/reject",adminassignmentreject);
module.exports=adminrouter;