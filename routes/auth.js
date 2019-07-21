const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.get('/', auth ,async(req,res)=>{
   try {
       const user = await User.findById(req.user.id).select('-password');
       res.json(user);
   } catch (error) {
       console.error(err.message);
       res.status(500).send('Server Error');

   }
})

router.post('/',[check('email', 'enter email').isEmail(),
check('password', 'enter valid password').exists()
], async (req,res)=>{
  
      var valid = validationResult(req);
      if(!valid.isEmpty()){
         return  res.status(400).json({valid: valid.array()});
      }
      const {email, password} = req.body;
    try {
        var user = await User.findOne({email});
        if(!user){
           return  res.status(400).json({msg: "Invalid data email"});
        }
        const isMatch  = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid data password"});
        }

        const payload = {
            user:{
                user: user.id
            }
        };
        jwt.sign(payload,
            config.get('jwtToken'),
        {
            expiresIn: 360000
        }, (err, token)=>{
            if(!err) throw err;
            res.json({token})
        });
  } catch (error) {
      console.err(err.message);
      res.status(500).send('server Error');
  }
})



module.exports = router;