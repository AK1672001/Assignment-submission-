const User = require("../Models/user");
const Assignment=require("../Models/assignment");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const register = async (req, res) => {
  const { username, password, email } = req.body;
  try{
    const data = await User.findOne({email});
  if (data) return res.status(404).json({ msg: "email already exist" });
  const hashpassword= await bcrypt.hash(password,10)
  const user = new User({ username, password:hashpassword, email, role: "user" });
  await user.save();
  return res.status(200).json({ message: "User registered successfully",user });
  }
  catch(err){
    return res.status(500).json({msg:err.message})
  }
};

const login=async(req,res)=>{
    const {email,password}=req.body
    console.log("req.body",email,password)
    try{
          const user= await User.findOne({email})
          console.log("user",user)
          if(!user) return res.status(404).json({msg:"email not a exist"})
           const validpassword= await bcrypt.compare(password,user.password);
        console.log("validpassword>>",validpassword);
          if(!validpassword) return res.status(404).json({msg:"please correct this password"});
        
        const token = jwt.sign({ id: user._id, role: user.role,username:user.name },process.env.SECRET_JWT );
         console.log("token",token)
          return res.status(200).json({msg:"successfully login user ",user,token})
    }
    catch(err){

    }
}

const assignmentupload= async(req,res)=>{
    const { userId, task, admin } = req.body;
    const assignment = new Assignment({ userId, task, admin });
    await assignment.save();
    res.status(200).json({ message: 'Assignment uploaded',assignment });
}
const getassignmentadmin= async(req,res)=>{
    try{
        const alladmin=await User.find({role:'admin'});
    
   return res.status(200).json({ message: 'fetched successfully',alladmin }); 
    }
    catch(err){
        console.log(err);
    }
    
}
module.exports={register,login,assignmentupload,getassignmentadmin}