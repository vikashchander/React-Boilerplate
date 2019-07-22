const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');

router.post('/',[auth, check('name', 'name is not empty').not().isEmpty()] ,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, contact, type} =req.body;
    try {
        const newContact = new Contact({
            name,
            type,
            contact,
            email,
            user: req.user.id
        })
        const contactData = await newContact.save();
        res.status(200).json(contactData);

    } catch (error) {
        console.error(error.message);
        res.status(500).json('server error');
    }
})

router.get('/',auth,async (req,res)=>{
   try {
       const contacts = await Contact.find({user:req.user.id}).sort({data: -1});
       res.status(200).json(contacts);
   } catch (error){
       console.error(error.message);
       res.status(500).send('Server Error');
   }
})

router.put('/:id',(req,res)=>{
    res.send('update contacts')
})
router.delete('/:id',(req,res)=>{
    res.send('delete contacts')
})


module.exports = router;