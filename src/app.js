const express= require("express"); //referencing to the code of express from the node modules
const connectDB = require("./config/database");

const app= express(); //we called the express fucntion in a way creating an express application 

connectDB().then(()=>{
    console.log("connected DB");
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
