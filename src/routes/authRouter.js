// [signup, login and logout api group]
 const express= require("express");

 const authRouter= express.Router();
 const User= require("../models/User");
 const bcrypt=require("bcrypt");
 const validatesignupdata=require("../utils/validation");
 

 authRouter.post("/signup", async(req,res)=>{
    try{
        if(validatesignupdata(req)){
            const password=req.body.password;

            const passhash= await bcrypt.hash(password, 10); //await--becoz returns promise
                                                             //bcrypt.hash-- method to encrypt password
                                                             //10-- salt rounds  
            
         const user= new User({...req.body, password : passhash}); //pehle modify passwaord value to passhash then create user instance
          await user.save();
           res.send("API WALA DATA IN DB with validations from custom validate funtion");
        }
    }
    catch(err){
        res.status(400).send("Sorryyyy :" + err);
    }
});

authRouter.post("/login", async(req,res)=>{
    try{
    const {email, password}= req.body;
    //cheking if email is valid

    const user= await User.findOne({email:email});
    if(!user)
    {
        throw new Error("Invalid Credentials");
    }
    // const ispassCorrect  = await bcrypt.compare(password, user.password); //instead using schema methods
     const ispassCorrect= await user.validatePassword(password);
    if(ispassCorrect)
    {
        //lets make cookiess!
        // const token= await jwt.sign({_id:user._id}, "SECRET@KEY", {expiresIn: '3d' }); //instead use form the schemamethods
        const token= await user.getJWT();
        res.cookie("token", token, {httpOnly: true}) // Prevents XSS attacks-- will worn on htt server only);
        res.send("Login succcessfullyyyyy!!")
    }
    else{
        throw new Error("Invalid Credentials");
    }}
    catch(err){
        res.status(400).send("Sorryyyy :" + err);
    }
})

module.exports=authRouter;









// app.delete("/user", async(req, res)=>{
//     const userid= req.body.userid;
//     try{
//         const user= await User.findByIdAndDelete({_id:userid});
//         if(user.length===0)
//         {
//             res.send("user not found");
//         }
//         res.send("deleted entry")
//     }catch(err)
//     {
//         res.status(400).send("something went wrong");
//     }
// })