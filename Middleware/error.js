const ErrorHandler=require('../utils/errorhandler');

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server Error";

  
    //mongoose duplicate key error
    if(err.code===11000){
        const message=`Duplicate ${object.keys(err.keyvalue)} Entered`;
        err=new ErrorHandler(message,400);
    }

//json web token error'
if(err.name==="jsonwebTokenError"){
    const message=`json web token is invald,try again`;
    err=new ErrorHandler(message,400);
}

//jwt expire error
if(err.name==="TokenExpiredError"){
    const message=`json web token is expired,try again`;
    err=new ErrorHandler(message,400);
}



    res.status(err.statusCode).json({
        success:false,
        error:err.message,
    });
};