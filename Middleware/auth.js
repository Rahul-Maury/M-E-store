const ErrorHandler = require("../utils/errorhandler");
const jwt=require('jsonwebtoken');
const User=require('../Modal/userModal')
exports.isAuthenticatedUser= async(req,res,next)=>{
  try{
    const {token}=req.cookies;
  // console.log(token);
   if(!token){
       return next(new ErrorHandler("Please Login to acess this rosource", 401));

   }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    //console.log(decodedData);
     req.user=await User.findById(decodedData.id);
     next();
  }
    
  catch(e){
    next(e);
  }

};
exports.authorizeRoles=(...roles)=>{
  return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
          return next(
          new ErrorHandler(
            `Role: ${req.user.role} is Not allowed to access this resouce`,
            403
            )
          );     
        }
        next();
};
};