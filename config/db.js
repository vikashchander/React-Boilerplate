const mongoose = require('mongoose');
const config = require('config');
const db = config.get('dbConfigUrI');

const connectDB = async () =>{
    try {
    await mongoose.connect(db,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    console.log('db connected');    
    } catch (error) {
        console.error(`error is ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
