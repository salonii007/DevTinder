const mongoose = require("mongoose");

const userSchema= new mongoose.Schema(
    {
        firstname : {
            type:String
        },
        lastname:{
            type: String
        },
        email:{
            type:String

        },
        password:{
            type: String
        },
        age:{
            type: Number
        },
        dateofbirth:{
            type:Date
        },
        gender:{
            type: String
        },
        hobbies:{
            type: Array
        }
    }
) //method for schema creation

const User= mongoose.model("User", userSchema); //with this model we create new instances & put in db

module.exports= User;  //exporting it to import user model to make instances in the main file