const express= require("express");

const requestRouter = express.Router();

const userAuth=require("../utils/Userauthentiction");
const Request=require("../models/Request");
const User= require("../models/User");


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

})

module.exports=requestRouter;