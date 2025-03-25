
const express= require("express");
const userRouter= express.Router();
const userAuth= require("../utils/Userauthentiction");
const mongoose = require("mongoose");
const Request= require("../models/Request");
const User = require("../models/User");

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

    userRouter.get("/feed", userAuth, async(req,res)=>{
        try{

            const loggedInUser= req.user;

            const page= parseInt(req.query.page) || 1;
            let limit= parseInt(req.query.limit) || 10;
           limit = limit >50 ? 50: limit;
            const skip = (page-1)*limit;

        const connreq= await Request.find({
            $or:[
                {fromUserId: loggedInUser},
                {toUserId:loggedInUser}
            ]
        })

        const hideUsersFromFeed= new Set();

        connreq.forEach((req)=>{
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString())});


        // const users = await User.find({
        //     _id: { $nin: [Array.from(hideUsersFromFeed)], $ne: loggedInUser._id }
        // }).select("firstname lastname instagram age gender");

        const users = await User.find({
            _id: { 
                $nin: [...hideUsersFromFeed].map(id => new mongoose.Types.ObjectId(id)), // Convert to ObjectId
                $ne: new mongoose.Types.ObjectId(loggedInUser._id) // Convert logged-in user ID
            }
        }).select("firstname lastname instagram age gender")
        .skip(skip)
        .limit (limit);

        res.json({
            message: "Here is your feed",
            data: users
        });


        }
        catch(err){
            res.status(400).send("SOrrryy"+err);
        }
    })
module.exports=userRouter;