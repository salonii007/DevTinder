//jab we have alredy added the constraints for all the field in the db schema! why are we adding on the
// alag se validation function??

// ----->  Custom Validation(validations.js)
//          1.Before saving/updating data (inside your routes or controllers)	
//          2.Provides instant feedback to users
//          3.runs Before data reaches the database

// ------>Mongoose Schema Validation
//        1.Inside models/User.js (MongoDB schema)	
//        2.Ensures data integrity at the database level
//        3.runs When data is inserted/updated in MongoDB

// So its importnat to write dono!

const validator= require("validator"); //npm lib of validators

const validatesignupdata= (req)=>{
    const {firstname, lastname, dateofbirth, email, password,gender, age, instagram, photo }=req.body;  //destructuring from the req.body
    //now all the validation logics!
    if(!["male","female","other"].includes(gender)){
        throw new Error("Gender not valid");
    }

    else if(!firstname || !lastname || ! email || !password || !dateofbirth || !age){
        throw new Error("Fill all the required fields");
    }
    else if(firstname.length<3 || lastname.length<3)
    {
        throw new Error ("Insuffiecient characters");
    }
    else if(!validator.isEmail(email)){
        throw new Error("enter valid email address");
    }
    else if (!(validator.isEmail(email)) || !(validator.isEmail(email))){
        throw new Error ("Enter valid url");
    }
    else if (age < 18 || age > 120) {
        throw new Error("Age must be between 18 and 120");
    }

    return true;

}

const validateEditdata = async(req)=>{
        const data=req.body;
        const AllowedUpdates=[ "photo", "instagram", "age", "hobbies", "gender","about", "phone"];
        const isUpdate = Object.keys(data).every((k)=> AllowedUpdates.includes(k));
        
        return isUpdate;
        
}

module.exports={validatesignupdata, validateEditdata};