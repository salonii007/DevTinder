//for the connection request status and collection
const mongoose = require("mongoose");

const requestSchema=new mongoose.Schema({
  fromUserId:{
    type:mongoose.Schema.ObjectId,// for the object ids tht mongo gives by itself
    required:true
  }  ,
  toUserId:{
    type: mongoose.Schema.ObjectId,
    required:true
  },
  Status:{
    type:Status,
    required: true,
    enum: {                        //instead of validate funtion in gender and all this! enum <3
        values:["ignored","interested","rejected","accepted"],
        message:"{Value} is not valid" 
    }
  }
},
  {timestamps:true}
)

const Request= mongoose.model("Request", requestSchema); //with this model we create new instances & put in db

module.exports= Request;  //exporting it to import request model to make instances in the main file