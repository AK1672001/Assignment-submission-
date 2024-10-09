const {register,login,assignmentupload}=require("../Controller/usercontroller");

const express=require("express");
const userrouter=express.Router();

userrouter.post("/register",register)
userrouter.post("/login",login)
userrouter.post("/assignmentupload",assignmentupload)
module.exports=userrouter;