const mongoose=require("mongoose");

const conString=process.env.DB;

  mongoose.connect(conString,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
    // useFindAndModify:false
  }).then(()=>
  {
    console.log("Database Connected");
  }).catch((err)=>
  {
    console.log("No Database Connected",err);
  })
