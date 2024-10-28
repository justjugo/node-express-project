const express =require('express')
const bcrypt=require('bcrypt')
const { render } = require('ejs');
const User = require('../models/user');

const router=express.Router();


//get login page
router.get('/login', async(req, res) => {
    try
    {
        req.session.destroy
        
        res.render('auth/login',{message:''})
    }catch(err)
    {
        res.render('404')
    }
    
  })

// get Signup page

router.get('/signup', async(req, res) => {
    try
    {
        res.render('auth/signup')
    }catch(err)
    {
        res.render('404')
    }
    
  })

// create new user

router.post('/signup', async(req, res) => {
    try
    {
        const {username,email,password,confirm_password} = req.body
        if(password ===confirm_password)
        {
            const existingUser = await User.findOne({
                $or:[
                    { username },
                    {email}]
            }
            );
            if (existingUser) return res.status(400).json({ message: 'User already exists' });
            
            const user=new User({username,email,password})
            await user.save()
            res.status(201).json({ message: 'User registered successfully' });
            res.redirect('/user/login')
        }else{
            res.render('auth/signup')
        }

    }catch(err)
    {
        res.render('404')
    }
    
  })

// Login request handeling 


router.post('/login', async(req, res) => {
    try
    {
        const{username,password}=req.body
        const user=await User.findOne({username})

        if(!user){res.render('auth/login',{message:'user not found !'});return;}
        
        const isMatch= await user.comparePassword(password)
        if(!isMatch){res.render('auth/login',{message:"password incorect"}) ;return;}
        console.log(isMatch)
        req.session.user = { id: user._id, username: user.username };

        res.redirect('/costumer')
    }catch(err)
    {
        
        res.render('404')

    }
    
  })

  // logout page

  router.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) return res.status(500).json({ message: 'Logout failed' });
      res.render('auth/login',{message:''})
    });
  });


module.exports=router;
