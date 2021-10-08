const express=require("express");
const {saveUser,showUser,editUser,deleteUser} =require("../Controller/userController")

const router=express.Router();

router.post("/api/user/register",saveUser);
router.get("/api/user/show",showUser);
router.put("/api/user/edit",editUser);
router.delete("/api/user/delete/:id",deleteUser);

module.exports=router;