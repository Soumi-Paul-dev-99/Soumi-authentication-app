const express = require("express");
const userRoutes = require("../routers/userRoutes");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


exports.register = async (req,res) =>{
try {
    const {name,email,password} = req.body;

if(! (name && email && password)) {
 res.status(400).send("please enter all fields carefully")
}

if(password.length <6){
    return res.status(400).json({ message :" password less than 6 characters"})
}

const olduser = await User.findOne({email});

if(olduser){
   return res.status(409).send("email already exit")
}

 encryptedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password :encryptedPassword,
    });

const token = await jwt.sign({user_id:user._id , email},
    process.env.SECRECT_KEY,
    {
        expiresIn:"2h"
    })

    user.token = token;

    res.status(200).json({
        success:true,
        message:"User Register Successfully",
        user

    })

} catch (error) {
    res.status(500).json({
        success:false,
        message:"error registration",
        error
    })
}
}

exports.welcome = async (req,res) =>{
    res.status(200).send("Welcome 🙌 ");
}

exports.login = async (req,res) =>{
    try {
    
        const {email,password} = req.body;
        if(! (email && password)){
            res.status(400).send("All input is required")
        }
        const user = await User.findOne({email});

        if(user && ( await bcrypt.compare(password,user.password))){

            const token = jwt.sign({user_id:user._id , email},
                process.env.SECRECT_KEY,
                {
                    expiresIn:"4h"
                }
                );

                user.token = token;

                res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({
            success:true,
            message:" user register successfully",
            error
        })
    }
}
exports.update = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        console.log(user.role);
     
        if(user.role === 'admin'){
         res.status(200).json({message:"User is already an admin"})
        }else{
         res.status(404).json({
                              message:"Role is not Admin"
                         })
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params.id;
        const user =  await User.findByIdAndDelete(id)
        res.status(201).json({ message: "User successfully deleted", user })
    } catch (error) {
        res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    }
}
