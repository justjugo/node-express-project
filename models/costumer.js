const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the table)
const costumerSchema = new Schema({
    gender:String,
    country:String,
    age:String,
    phone:String,
    email:String,
    lastname:String,
    firstname:String,
},
{ timestamps: true }

);
 
 
// Create a model based on that schema
const Costumer = mongoose.model("Costumer", costumerSchema);
 
 
// export the model
module.exports = Costumer;