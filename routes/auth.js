const express = require('express');
const router = express.Router();

router.post('/', (req,res)=>{
    res.send('plz login');
})

router.get('/',(req,res)=>{
    res.send('user logged in')
})

module.exports = router;