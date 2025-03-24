//for the connection request status and collection
const mongoose = require("mongoose");

const requestSchema=new mongoose.Schema({
  fromUserId:{
    type:mongoose.Schema.ObjectId,// for the object ids tht mongo gives by itself
    ref: "User", // for making it as the foreign key or connecting field in User db and request db
    required:true
  }  ,
  toUserId:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required:true
  },
  status:{
    type: String,
    required: true,
    enum: {                        //instead of validate funtion in gender and all this! enum <3
        values:["ignored","interested","rejected","accepted"],
        message:"{Value} is not valid" 
    }
  }
},
  {timestamps:true}
)

requestSchema.pre("save", function(next){ //similar to scheme methods! schema pre will be called always before saving data in db

  const connrequest= this;
  if(connrequest.fromUserId.equals(connrequest.toUserId))
  {
    throw new Error("You cant send request to yourself");
  }
  next();//cuz it is kinda middleware 

})
const Request= mongoose.model("Request", requestSchema); //with this model we create new instances & put in db

module.exports= Request;  //exporting it to import request model to make instances in the main file