const mongoose = require("mongoose");

const userSchema= new mongoose.Schema(
    {
        firstname : {
            type:string
        },
        lastname:{
            type: string
        },
        email:{
            type:string

        },
        password:{
            type: string
        },
        age:{
            type: Number
        },
        dateofbirth:{
            type:Date
        },
        gender:{
            type: string
        },
        
    }
) //method for schema creation