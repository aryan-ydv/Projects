const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt =require('bcrypt');
const jwt=require("jsonwebtoken");
const jwtKey = "my_secret_key"
 
const User=require('../models/user');
const user = require('../models/user');
 router.post('/signup', (req,res,next)=>{
     user.find({email: req.body.email})
     .exec()
     .then(user =>{
         if(user.length>=1){
           return res.status(409).json({
               message: "Mailid exist already"
           });

         } else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                 return res.status(500).json({
                  error: err
                 });
                } else{
               const user= new User({
                   email: req.body.email,
                   password: hash
                      
                   });
                   user
                   .save()
                   .then(result =>{
                       console.log(result)
                     res.status(201).json({
                        message: 'user created'
                     });
                   })
                   .catch(err =>{
                       console.log(err)
                       res.status(500).json({
                           error: err
                       })
                   });
                }
        
               });
         }
     })
    
 });

     router.post('/login', (req,res,next)=>{
       User.find({email: req.body.email})
       .exec()
       .then(user =>{
           if(user.length<1){
               return res.status(401).json({
                   message: "Auth Failed"
               })
           }
           bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
               if(err){
              return res.status(401).json({
                  message: "Auth Failed"
              });
            }

            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                   userId: user[0].userId
                },
                 jwtKey,
                {
                    expiresIn: "1h"
                }
                
                );
                return res.status(200).json({
                    message: "Auth Successfull",
                    token: token
                });
            } 
            res.status(401).json({
                message: "Auth Failed"

           });
        });
       })
       .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err 
       });
    });
     });
      router.delete('/:userId', (req,res,next)=>{
           User.remove({_id: req.params.userId})
           .exec()
           .then(result=>{
           res.status(200).json({
               message: "user deleted"
           });

           })
           .catch(err =>{
              console.log(err)
              res.status(500).json({
                  error:err 
              });
           });
      });
  
 module.exports=router;