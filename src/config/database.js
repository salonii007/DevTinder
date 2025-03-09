const mongoose= require("mongoose"); //after installing mongoose becoz not part of npm 
const connectDB = async()=> {
    mongoose.connect("mongodb+srv://saloni007:saloni@DB26@nodejs.76dl4.mongodb.net/?retryWrites=true&w=majority&appName=Nodejs"); //ye string mongodb cluster se aayi he!
}
connectDB.then(()=>
{
    console.log("DB connected successfully") //happy case
})
.catch((err)=>
{
    console.log("DB connection failed"); //sad case
});

module.exports = connectDB; //yaha se export karenge n mail file me import