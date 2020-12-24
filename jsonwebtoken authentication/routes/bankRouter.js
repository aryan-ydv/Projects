const express=require('express');
const bankModel=require('../models/bank');
const app=express();
//const checkAuth=require("../middleware/checkAuth");

app.get('/get', async(req,res)=>{
      const bank= await bankModel.find()
      res.json(bank)
  
});


app.post('/post',(req,res)=>{

  
      const bankmodel = new bankModel({
        BankId: req.body.BankId,
        Name: req.body.Name,
        Location: req.body.Location
        });
    bankmodel.save().then(result => {
      res.send("successfully uploaded");
    })
    .catch(err => {
    res.status(500).json({ error: err });
    });
  
});


 app.put('/:id', async(req,res)=>{    
   
      try{
        const bank=await bankModel.findById(req.params.id)
        bank.Name=req.body.Name;
        const a1=await bank.save()
        res.json(a1);
      }
      catch(err){
        res.send(err);
  
      }
   
    
});


app.delete('/:id',async(req,res)=>{
   try{
      const bank=await bankModel.findByIdAndRemove(req.params.id)
      bank.Name=req.body.Name;
      const a1=await bank.remove()
      res.json(a1);
    }
    catch(err){
      res.send('Error');
       
    }
 
});
 

  module.exports=app;