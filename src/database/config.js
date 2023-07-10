const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected");
})
.catch((error)=>{
    console.log(error)
})

// 127.0.0.1:27017