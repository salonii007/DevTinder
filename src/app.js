const express= require("express"); //referencing to the code of express from the node modules
const connectDB = require("./config/database");
const User= require("./models/User");
// const validatesignupdata= require("./utils/validation");  //for validation!
// const bcrypt= require("bcrypt"); //npm pacakge for encryption of password!
const cookieParser = require("cookie-parser");
// const jwt= require("jsonwebtoken");
// const userAuth= require("./utils/Userauthentiction")
const authRouter=require("./routes/authRouter");
const profileRouter=require("./routes/profileRouter");



const app= express(); //we called the express fucntion in a way creating an express application 

app.use(express.json()); //middleware tht converts the JSON wali api coming request to JS OBJECT

app.use(cookieParser()); //now whenever req comes back! we will pehle read the cookies


app.use("/",authRouter);
app.use("/", profileRouter);


 app.use("/",(err, req, res, next)=>{     //ALWAYSSSS at the end to to handle any unexpected error gracefully without leaking any info
    if(err)
    {
        res.status(400).send("SOMETHING IS WRONG");
    }
 });
app.listen(3000, ()=>{
    console.log("challl gaya server"); //this funtion will run if the server is successfully ctively listening
}); //with the port to listen the incoming request on the server
