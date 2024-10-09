const User = require("../Models/user");
const Assignment=require("../Models/assignment");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const register = async (req, res) => {
  const { username, password, email } = req.body;
  try{
    const data = await User.findOne({ username,email });
  if (data) return res.status(404).json({ msg: "username ,email already exist" });
  const hashpassword= await bcrypt.hash(password,10)
  const admin = new User({ username, password:hashpassword, email, role: "admin" });
  await admin.save();
  return res.status(200).json({ message: "admin registered successfully",admin });
  }
  catch(err){
    return res.status(500).json({msg:err.message})
  }
};

const login=async(req,res)=>{
    const {username,password}=req.body
    console.log("req.body",username,password)
    try{
          const admin= await User.findOne({username,role: 'admin'})
          console.log("user",admin)
          if(!admin) return res.status(404).json({msg:"username not a exist"})
           const validpassword= await bcrypt.compare(password,admin.password);
        console.log("validpassword>>",validpassword);
          if(!validpassword) return res.status(404).json({msg:"please correct this password"});
        
        const token = jwt.sign({ id: admin._id, role: admin.role },process.env.SECRET_JWT );
         console.log("token",token)
          return res.status(200).json({msg:" admin successfully login  ",admin,token})
    }
    catch(err){

    }
}

const adminassignment=async(req,res)=>{
    const { admin } = req.body;
    // console.log("admin",admin);
    const assignments = await Assignment.find({ admin });
    // console.log("assignment",assignments)
    res.status(200).json({msg:"assignment admin",assignments});
}
const adminassignmentaccept=async(req,res)=>{
    const { id } = req.params;
    await Assignment.findByIdAndUpdate(id, { status: 'accepted' });
    res.status(200).json({ message: 'Assignment accepted' });
}
const adminassignmentreject=async(req,res)=>{
    const { id } = req.params;
    await Assignment.findByIdAndUpdate(id, { status: 'rejected' });
    res.status(200).json({ message: 'Assignment rejected' });
}
module.exports={register,login,adminassignment,adminassignmentaccept,adminassignmentreject}