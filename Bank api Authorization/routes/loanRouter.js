const express=require('express');
const mongoose=require('mongoose');
const checkAuth = require('../middleware/checkAuth');
const app=express();
const loanModel=require('../models/loan');

app.get('/get',checkAuth,async(req,res)=>{
    try{
        const loan= await loanModel.find()
        res.json(loan)
     }
     catch(err){
         res.send('Error', +err);
     }
});

app.post('/post',checkAuth,(req,res)=>{
  const loanmodel = new loanModel({
    Id: req.body.Id,
     Type: req.body.Type,
     AccountId: req.body.AccountId,
     CustomerId: req.body.CustomerId
    });
loanmodel
.save()
.then(result => {
  res.send("successfully uploaded");
})
.catch(err => {
res.status(500).json({ error: err });
});
  
});
app.put('/:id',checkAuth,async(req,res)=>{
    try{
      const loan=await loanModel.findById(req.params.id)
      loan.Type=req.body.Type;
      const a1=await loan.save()
      res.json(a1);
    }
    catch(err){
      res.send('Error');
  
    }
  });

  app.delete('/:id',checkAuth,async(req,res)=>{
    try{
      const loan=await loanModel.findByIdAndRemove(req.params.id)
      loan.Name=req.body.Name;
      const a1=await loan.remove()
      res.json(a1);
    }
    catch(err){
      res.send('Error');
  
    }
  });
  module.exports=app;