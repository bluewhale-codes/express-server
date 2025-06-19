const connectToMongo = require("./db");
const app = require("./app");
const cloudinary = require('cloudinary')


const port = 5000;

app.listen(port,()=>{
   console.log(`server is working on http://localhost:${port}`);
})

connectToMongo();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});