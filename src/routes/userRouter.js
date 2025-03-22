
const express= require("express");
const userRouter= express.Router();
const userAuth= require("../utils/Userauthentiction");
const Request= require("../models/Request");


userRouter.get("/user/requests", userAuth, async(req,res)=>{
    try{
        const loggedinUser= req.user;

        const connectionreq= await Request.find({
            toUserId: loggedinUser._id,
            status:"interested"
        }).populate("fromUserId","firstname lastname instagram age gender n");

        res.json({
            message: "tara tara ye ri requestttss",
            data: connectionreq
        });

    }
    catch(err)
    {
        res.status(400).send("SORRYYYYY"+ err);
    }
})

module.exports=userRouter;