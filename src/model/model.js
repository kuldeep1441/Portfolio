const mongoose=require('mongoose');
 const schemaModel1= new mongoose.Schema({
    name:{
        type:String,
        require:true

    },
    email:{
        type:String,
        require:true,
        unique:false,
    },
    message:{
        type:String,
        require:true,
    }
 })
 const contactuserData=new mongoose.model("contactusdata",schemaModel1);
 module.exports={
    collection1:contactuserData
 }