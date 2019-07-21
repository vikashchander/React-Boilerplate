const express = require('express');
const server = express();
const connectDB =require('./config/db');

//connect DB
connectDB();

//Init  Middleware
server.use(express.json({extended: false}))

server.get('/', (req,res)=>{
    res.json({msg: "welcome to the contactkeepper Api   "});
})

server.use('/api/auth', require('./routes/auth'));
server.use('/api/users', require('./routes/users'));
server.use('/api/contacts', require('./routes/contacts'));


const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{
    console.log(`server start at ${PORT}`);
})