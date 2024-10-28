const express = require('express')

const router = express.Router();
const Costumer=require('../models/costumer');
const { render } = require('ejs');
const moment=require('moment')



function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
   res.redirect('/user/login')
  }
}
//get all the costumers 
router.get('/',isAuthenticated, async(req, res) => {
    try
    {
        costumers=await Costumer.find()
        
        res.render('index',{costumers:costumers,moment:moment})
    }catch(err)
    {
        res.render('404')
    }
    
  })

// Get one Costumer

router.get('/:id',isAuthenticated, async (req, res) => {
  try{
    id=req.params.id
    costumer=await Costumer.findById(id)
   
    res.render('user/view',{costumer:costumer, moment:moment})

  }catch(err)
  {
    res.render('404')
  }
  
})

//  Add costumer
router.get('/user/add',isAuthenticated, (req, res) => {
    res.render('user/add')
  })



router.post('/user/add',isAuthenticated, async(req, res) => {
    try{
        data=req.body
        cosutumer=new Costumer(data)
        resp=await cosutumer.save()
        res.redirect('/costumer')

    }catch(err){
        res.render('404')
    }
   
  })
  
  
// Update a costumer 

router.get('/user/edit/:id',isAuthenticated, async(req, res) => {
  id=req.params.id
  costumer=await Costumer.findById(id)
  
  res.render('user/edit',{costumer:costumer})
})



router.put('/user/edit/:id',isAuthenticated, async (req, res) => {
  try{
    data=req.body
    id=req.params.id
   
    await Costumer.updateOne({_id:id},data)
    
    
    res.redirect('/costumer')

  }catch(err)
  {
    res.render('404')
  }
  
})

// Delite costumer


router.delete('/delete/:id',isAuthenticated, async(req, res) => {
  try{
    const id=req.params.id
    await Costumer.deleteOne({_id:id})
    res.redirect('/costumer')

  }catch(err)
  {
    res.render('404')
  } 
  
})

// Find element by name 


router.post('/search',isAuthenticated, async(req, res) => {
 try{
  const search=req.body.search
  console.log(search)
  costumers=await Costumer.find({firstname:{$regex:search,$options:"i"}})
  console.log(costumers)
  
  res.render('user/search',{costumer:costumers})
 }catch(err)
 {
  console.log(err)
  res.render('404')

 }
})

module.exports =router;

