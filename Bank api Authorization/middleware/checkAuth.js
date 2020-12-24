const jwt=require("jsonwebtoken");
const jwtKey = "my_secret_key"

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded= jwt.verify(token,jwtKey)
         req.userData= decoded;
         next();
    }
    catch(error){
        return res.status(403).json({
            message:"Authentication Failed" })
    }
 
};