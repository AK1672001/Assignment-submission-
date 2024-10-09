const {register,login,adminassignment,adminassignmentaccept,adminassignmentreject}=require("../Controller/admincontroller");
const express=require("express");
const adminrouter=express.Router();

adminrouter.post("/admin/register",register);
adminrouter.post("/admin/login",login);
adminrouter.get("/admin/assignment",adminassignment);
adminrouter.post("/admin/assignment/:id/accept",adminassignmentaccept);
adminrouter.post("/admin/assignment/:id/reject",adminassignmentreject);
module.exports=adminrouter;