const {register,login,assignmentupload,getassignmentadmin}=require("../Controller/usercontroller");

const express=require("express");
const userrouter=express.Router();

userrouter.post("/register",register)
userrouter.post("/login",login)
userrouter.post("/assignmentupload",assignmentupload)
userrouter.get("/admin",getassignmentadmin)
module.exports=userrouter;