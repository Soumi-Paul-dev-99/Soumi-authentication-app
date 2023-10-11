const express = require ("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const userRoutes = require ("./routers/userRoutes");
const User = require("./Models/userModel");
const auth = require("./middleware/auth");
const errorHandler = require ("./middleware/ErrorHandler");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(userRoutes);
app.use(errorHandler);
connectDB();

app.get("/", (req,res)=>{
    res.send("get method called")
})
app.post("/welcome", auth, (req, res , next) => {
    res.status(200).send("Welcome 🙌 ");
    next(new Error("Failed"))
  });


app.listen(port,()=>{
    console.log(`server running on the port http://localhost:${port}`)
})
