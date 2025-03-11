//only signup and login pi should ork withoun user auth! baki sabke pehle there should be auth

const jwt= require("jsonwebtoken");
const req = require("express/lib/request");
const User = require("../models/User");

const userAuth= async(req, res, next)=>{
    try{
        const cookies= req.cookies;
        const {token}= cookies; //req me body nad cookies dono he! usme se cookies me se token jo he vo!

        const decodedobj= await jwt.verify(token, "SECRET@KEY"); //jwt mehton for verifying the cookies token
        const {_id}= decodedobj;
        const user= await User.findById(_id);

        if(!user) //if token se aaya id is expired or false
        {
            throw new Error("User not found");
        }
        req.user= user //attaching the found user with req hi! taki wapis ni karna pade;
        next();
    }catch(err)
    {
        res.status(400).send("Sorry :"+err);
    }
}
module.exports=userAuth;