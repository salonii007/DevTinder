// [profile/view-edit-passwordchange]

const express= require("express");
const User=require("../models/User");
const userAuth=require("../utils/Userauthentiction");
const profileRouter= express.Router();


profileRouter.get("/profile", userAuth, async(req,res)=>{   //using get api to get data from db in response
    try{
    
    res.send(req.user);
    }catch(err){
        res.status(400).send("something went wrong");
    }
});

profileRouter.patch("/profile", async (req, res)=>{
    try{
    const data=req.body;
    const _id=data._id;
    const Allowed_Updates=[ "_id", "photo", "instagram", "age", "hobbies", "gender","about", "phone"];
    const isUpdate = Object.keys(data).every((k)=> Allowed_Updates.includes(k));
    if(!isUpdate){
    res.status(400).send("update not allowed");
    }
    
        const user= await User.findByIdAndUpdate({_id}, data, { runValidators: true }); //runvalidator-- for using validations on apis updates
        res.send("data updated using patch");
    }catch(err){
        console.log(err);
        res.status(400).send("something went wrong");
    }
})
 

module.exports=profileRouter;