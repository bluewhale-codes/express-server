const connectToMongo = require("./db");
const app = require("./app");



const port = 5000;

app.listen(port,()=>{
   console.log(`server is working on http://localhost:${port}`);
})

connectToMongo();