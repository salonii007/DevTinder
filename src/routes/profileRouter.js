// [profile/view-edit-passwordchange]

const express= require("express");
const User=require("../models/User");
const userAuth=require("../utils/Userauthentiction");
const profileRouter= express.Router();
const {validateEditdata}=require("../utils/validation")


profileRouter.get("/profile", userAuth, async(req,res)=>{   //using get api to get data from db in response
    try{
    
    res.send(req.user);
    }catch(err){
        res.status(400).send("something went wrong");
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res)=>{
    
    try{
        if(!validateEditdata(req)){
            throw new Error("Invalid edit request");
        }
        const loggedinUser=req.user; //user toh apan userAuth waqt attach karte na req me

        Object.keys(req.body).forEach((key)=> loggedinUser[key]=req.body[key]);

        await loggedinUser.save();
   
        res.send("data updated using patch");
    }
    catch(err){
        console.log(err);
        res.status(400).send("SORRYY"+ err);
    }
});
 

module.exports=profileRouter;