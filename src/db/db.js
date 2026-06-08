const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log('Connected to MongoDB');
    }).then((err)=>{
        console.log('Error connecting to MongoDB', err);
    });
}