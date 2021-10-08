const express=require('express')
const dotenv=require('dotenv');

const app=express();
app.use(express.json());
dotenv.config({path:"config.env"});

require("./src/DB/dbConnect");

app.get("/",(req,res)=>
{
  res.send("hello from server");
})


app.use(require("./src/Route/userRoute"));

app.listen(process.env.PORT || 4000,()=>
{
  console.log("server is started at port number",process.env.PORT)
})