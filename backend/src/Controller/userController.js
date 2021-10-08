const User=require("../Model/user");

exports.saveUser=(async(req,res)=>
{
  const {name,email,phone,dob,address,gender}=req.body;
  if(!name || !email || !phone)
  {
    return res.status(403).json({success:false,msg:"please fill all the fields"});
  }

  try{
    const isEmail=await User.findOne({email});
    if(isEmail)
    {
      return res.status(202).json({success:false,msg:"Account is already created"});
    }
    const user=new User({name,email,phone,dob,address,gender});
    const newUser=await user.save();
    if(newUser)
    {
      return  res.status(200).json({success:true,msg:"User Account is created"});
    }

  }catch(err)
  {
    console.log(err);
    res.status(500).json({success:false,msg:err})
  }
 
 
})



exports.showUser=(async(req,res)=>
{
  try
  {
    const allUser=await User.find();
    if(allUser)
    {
      return res.status(200).json({success:true,data:allUser})
    }
  }catch(err)
  {
    res.status(500).json({success:false,msg:err})
  }
})


exports.editUser=(async(req,res)=>
{
  try
  {
    const {_id,name,email,phone,gender,address}=req.body;
    const updataedUser=await User.findByIdAndUpdate({_id:_id},{$set:{name,email,phone,gender,address}});
    if(updataedUser)
    {
      return res.status(200).json({success:true,msg:"User updated sucessfully."})
    }
    res.status(402).json({success:false,msg:"unable to update user."})
  }catch(err)
  {
    console.log(err);
    res.status(500).json({success:false,error:err});
  }
})

exports.deleteUser=(async(req,res)=>
{
  const ids = req.params.id;
  try{
    
    const deletedUser=await User.findOneAndDelete({_id:ids});
    if(!deletedUser)
    {
      return res.status(402).json({success:false,msg:"unable to delete user" ,ids});
    } 
    res.status(200).json({success:true,msg:"User deleted sucessfully" ,ids});
  }catch(err)
  {
    console.log(err);
    res.status(500).json({success:false,error:err});
  }
})