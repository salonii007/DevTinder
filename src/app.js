const express= require("express"); //referencing to the code of express from the node modules
const connectDB = require("./config/database");
const User= require("./models/User");
const validatesignupdata= require("./utils/validation");  //for validation!
const bcrypt= require("bcrypt"); //npm pacakge for encryption of password!

const app= express(); //we called the express fucntion in a way creating an express application 

app.use(express.json()); //middleware tht converts the JSON wali api coming request to JS OBJECT

app.post("/signup", async(req,res)=>{
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
 
})


app.get("/user", async(req,res)=>{   //using get api to get data from db in response
    const email= req.body.email; //jo api req body me email he! vo wali entry
    try{
    const user= await User.find({email : email});  //Model.method({filter})
    if(user.length===0)
        res.send("user not found");
    else
    res.send(user);
    }catch(err){
        res.status(400).send("something went wrong");
    }
});

app.patch("/user", async (req, res)=>{
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
 
app.delete("/user", async(req, res)=>{
    const userid= req.body.userid;
    try{
        const user= await User.findByIdAndDelete({_id:userid});
        if(user.length===0)
        {
            res.send("user not found");
        }
        res.send("deleted entry")
    }catch(err)
    {
        res.status(400).send("something went wrong");
    }
})

app.use("/test",(req, res)=>{  //app.use to handle any incoming request. the arroe functon with parameters req, and res is a request handler function ka arrow function

    res.send("Hello! test")
})

app.use("/hello",(req, res)=>{  //app.use to handle any incoming request. the arroe functon with parameters req, and res is a request handler function ka arrow function

    res.send("Hello! hello")
});


 app.use("/",(err, req, res, next)=>{     //ALWAYSSSS at the end to to handle any unexpected error gracefully without leaking any info
    if(err)
    {
        res.status(400).send("SOMETHING IS WRONG");
    }
 });
app.listen(3000, ()=>{
    console.log("challl gaya server"); //this funtion will run if the server is successfully ctively listening
}); //with the port to listen the incoming request on the server
