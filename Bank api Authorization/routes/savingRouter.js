const express=require('express');
const mongoose=require('mongoose');
const checkAuth = require('../middleware/checkAuth');

const app=express();

const savingModel=require('../models/savings');

app.get('/get',checkAuth,async(req,res)=>{
    try{
        const saving= await savingModel.find()
        res.json(saving)
     }
     catch(err){
         res.send('Error', +err);
     }
});

app.post('/post',checkAuth,(req,res)=>{
  const savingmodel = new savingModel({
   Id: req.body.Id,
   CustomerId: req.body.CustomerId
    });
savingmodel
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
      const saving=await savingModel.findById(req.params.id)
      saving.Id=req.body.Id;
      const a1=await saving.save()
      res.json(a1);
    }
    catch(err){
      res.send('Error');
  
    }
  });


  app.delete('/:id',checkAuth,async(req,res)=>{
    try{
      const saving=await savingModel.findByIdAndRemove(req.params.id)
      saving.Name=req.body.Name;
      const a1=await saving.remove()
      res.json(a1);
    }
    catch(err){
      res.send('Error');
  
    }
  });
  module.exports=app;