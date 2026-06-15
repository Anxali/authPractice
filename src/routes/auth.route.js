const express = require('express');
const userModel = require('../models/user.model');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/register',async (req,res)=>{
    const {username,password} = req.body;

    const newUser = await userModel.create({username,password});

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);

    res.cookie('token',token)

    res.status(201).json({message:'User registered successfully', user: newUser});
})

router.post('/login',async(req,res)=>{
    const {username,password} = req.body;

    const user = await userModel.findOne({username,password});

    if(user){
        res.status(200).json({message:'Login successful', user});
    }else{
        res.status(401).json({message:'Invalid credentials'});
    }
})

router.get('/user',async(req,res)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //res.send(decoded);

        const user = await userModel.findOne({_id: decoded.id}).select('-password -__v');
        res.status(200).json({message:"User data retrieved successfully", user});

    }catch(err){
        res.status(401).json({message:"Unauthorized"});
    }
})



module.exports = router;