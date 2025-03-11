const mongoose = require("mongoose");
const validator= require("validator");

const userSchema= new mongoose.Schema(
    {
        firstname : {
            type:String,
            required: true,
            description: "'firstname' must be a string and is required",
            minlength:3
        },
        lastname:{
            type: String,
            required: true,
            description: "lastname' must be a string and is required",
            minlength:3
        },
        about:{
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true, //ek email se ek hi entry
            lowercase: true, // Convert to lowercase before saving
            validate: {
              validator: validator.isEmail, // Use validator function from npm lib to check if email is valid
              message: "Invalid email format"
            }
          },
        password:{
            type: String,
            required: true,
            validate: {
                validator: validator.isStrongPassword,
            message:"The password is too week"         
           }
        },
        age:{
            type: Number,
            min: 18,
            max: 120,
            required :true,
        },
        dateofbirth:{
            type:Date,
            required: true
        },
        phone: {
            type: String,
            validate: {
              validator: function (value) {
                return validator.isMobilePhone(value, "en-IN"); // Validate Indian phone numbers
              },
              message: "Invalid phone number"
            }
          },
        gender:{
            type: String,
            validate(gender){
                if(!["male","female","other"].includes(gender)){
                    throw new Error("Gender not valid");
                }
            }
            //to make this run on update apis! pass runvalidator:true as opyion in update api;
        },
        photo: {
            type: String,
            default: "https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=1024x1024&w=is&k=20&c=r--oPfS14d-ybe3adW-c_oy6q1tCz1c16SN8h5EdoKk=",
            validate: {
              validator: validator.isURL,
              message: "Invalid website URL"
            }
          },

        instagram: {
            type: String,
            validate: {
              validator: validator.isURL,
              message: "Invalid URL"
            }
          },
        
        hobbies:{
            type: Array,
            default: []
        }
    }
) //method for schema creation

const User= mongoose.model("User", userSchema); //with this model we create new instances & put in db

module.exports= User;  //exporting it to import user model to make instances in the main file