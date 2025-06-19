const connectToMongo = require("./db");
const app = require("./app");
const cloudinary = require('cloudinary')


const port = 5000;

app.listen(port,()=>{
   console.log(`server is working on http://localhost:${port}`);
})

connectToMongo();
cloudinary.config({
    cloud_name:"dxnjxur7j",
    api_key:"991935142292414",
    api_secret:"1Y7oRrRg8930qbN3UDr3CAXFnAk",
})