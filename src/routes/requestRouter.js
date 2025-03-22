const express= require("express");

const requestRouter = express.Router();

const userAuth=require("../utils/Userauthentiction");
const Request=require("../models/Request");
const User= require("../models/User");

//Dynamic api of sending request-- interested or ignored (basically right y aleft swipe blw two users)

requestRouter.post("/request/send/:status/:userid", userAuth, async(req, res)=>
{
    try{
    const fromUserId= req.user._id;
    const toUserId=req.params.userid;
    const status= req.params.status;

    const userExist= await User.findById(toUserId);
    if(!userExist){
     return   res.status(400).send("User doesnt exist");
    }

    const allowed_status= ["interested","ignored"];
    if(!(allowed_status.includes(status)))
    {
      return   res.status(400).send("Invalid status");
    }

    const reqExists= await Request.findOne({
        $or:[{fromUserId,toUserId},
            {fromUserId:toUserId, toUserId:fromUserId}
        ]
    })

    if(reqExists){
       return res.status(400).send("Request already exists")
    }

    const connReq=new Request({fromUserId, toUserId, status});

    const data= await connReq.save();
    res.json({
        message:"connection sent"
    })
}
catch(err){
    res.status(400).send("SORRRYYYYY"+ err);
}

});

//Dynamic api of accepting/rejecting an interested wali connection requesy
requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>
{
    try{
        const loggedInUser= req.user; //joooo userAuth wale me attach kiyya tha req pe
        const {status, requestId}=req.params;

        const allowed_status=["accepted","rejected"]
        if(!allowed_status.includes(status)){
            return res.status(400).send("invalid status");
        }

        const connectionRequest= await Request.findOne({
            _id:requestId,
            toUserId: loggedInUser._id,
            status:"interested"
        });
        if(!connectionRequest)
        {
            res.status(404).send("Connection req not found");
        }
        connectionRequest.status=status;
        const data= await connectionRequest.save();

        res.send("Connection request"+status);
    }
    catch(err)
    {
        res.status(400).send("Sorryyyyy"+ err);
    }
})

module.exports=requestRouter;