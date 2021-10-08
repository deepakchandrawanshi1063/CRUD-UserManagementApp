const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
  name:{type:String,trim:true},
  email:{type:String,trim:true},
  phone:{type:Number,trim:true,maxlength:10},
  dob:{type:Date,trim:true},
  gender:{type:String,trim:true},
  address:{type:String,trim:true}
})


const User=mongoose.model('USER',userSchema);
module.exports=User;