
const express= require("express");
const userRouter= express.Router();
const userAuth= require("../utils/Userauthentiction");
const Request= require("../models/Request");

const USER_SAFE_DATA= "firstname lastname instagram age gender";

userRouter.get("/user/requests", userAuth, async(req,res)=>{
    try{
        const loggedinUser= req.user;

        const connectionreq= await Request.find({
            toUserId: loggedinUser._id,
            status:"interested"
        }).populate("fromUserId","firstname lastname instagram age gender "); // foreignkey!!!!
    

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

userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try{
    const loggedinUser=req.user;

    const connections= await Request.find({
      $or:[  {toUserId: loggedinUser._id,
        status:"accepted"},
        {fromUserId: loggedinUser._id,
            status:"accepted"}
    ]}).populate("fromUserId", "firstname lastname instagram age gender ")
    .populate("toUserId","firstname lastname instagram age gender " );

    const data= connections.map((row)=>
        {
            if(row.fromUserId.toString()===loggedinUser._id.toString())
                return row.toUserId;
            else
           return row.fromUserId;
        });

    res.json({
        message:"all connections",
        data: data
    });
    }
    catch(err)
    {
        res.status(400).send("Sorry"+ err);
    }
})
module.exports=userRouter;