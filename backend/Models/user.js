const mongoose = require("mongoose");
const validator=require("validator")
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, 
    required: true ,
    validate:[validator.isEmail,"please provide a vilid email"]

},
  role: { type: String, enum: ["user", "admin"], required: true },
});
const User=mongoose.model("User",userSchema);
module.exports=User
