const mongoose = require("mongoose");
const mongoURL = "mongodb://0.0.0.0:27017/ecomms";

const connectToMongo = ()=>{
    mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log("Connect to mongoo successfully");
    })
    .catch(err=>{
        console.log("Error occur"+err)
    })

}


module.exports = connectToMongo;