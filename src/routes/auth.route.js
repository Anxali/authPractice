const express = require('express');
const userModel = require('../models/user.model');
const router = express.Router();


router.post('/register',async (req,res)=>{
    const {username,password} = req.body;

    const newUser = await userModel.create({username,password});
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


module.exports = router;