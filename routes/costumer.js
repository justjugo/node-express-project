const express = require('express')

const router = express.Router();
const Costumer=require('../models/costumer');
const { render } = require('ejs');
const moment=require('moment')

//get all the costumers 
router.get('/', async(req, res) => {
    try
    {
        costumers=await Costumer.find()
        console.log(costumers)
        res.render('index',{costumers:costumers,moment:moment})
    }catch(err)
    {
        res.render('404')
    }
    
  })

// Get one Costumer

router.get('/:id', async (req, res) => {
  try{
    id=req.params.id
    costumer=await Costumer.findById(id)
    console.log(costumer)
    res.render('user/view',{costumer:costumer, moment:moment})

  }catch(err)
  {
    res.render('404')
  }
  
})

//  Add costumer
router.get('/user/add', (req, res) => {
    res.render('user/add')
  })



router.post('/user/add', async(req, res) => {
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

router.get('/user/edit/:id', async(req, res) => {
  id=req.params.id
  costumer=await Costumer.findById(id)
  console.log(costumer)
  res.render('user/edit',{costumer:costumer})
})




module.exports =router;
