const mongoose = require("mongoose");
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DATABASE);
        console.log(`database connection successfull ${conn.connection.host}`)
    } catch (error) {
        console.log(`error connection ${error.message}`)
    }
}
module.exports = connectDB;