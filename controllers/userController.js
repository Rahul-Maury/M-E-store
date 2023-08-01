
const ErrorHandler =require('../utils/errorhandler.js');
const User=require('../Modal/userModal');
const sendToken = require('../utils/jwttoken.js');
//const { options } = require('../routes/productRoute');
const cloudinary=require("cloudinary");
const crypto=require('crypto');
const sendEmail=require('../utils/sendEmail.js');
//Register User ----s
exports.registerUser=async (req,res,next)=>{

    try{
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });


         const {name,email,password}=req.body;
        
          const user=await User.create({
                                       name,
                                       email,
                                       password,
                                        avatar:{
                                            public_id:myCloud.public_id,
                                            url:myCloud.secure_url,
                                            // public_id:"public_id",
                                            // url:"pulic url"
                                        }
                                        });

        // const token=user.getJWTToken();
        //   res.status(200).json({success:true,user,token});
        sendToken(user,200,res);
    }
    catch(e){
        console.log("yha hai error ",e);
         next(e);
       // res.status(500).json({success:false,Error});
       // next();
    }
}


// login User ---


exports.logInUser=async (req,res,next)=>{
    try{
      const {email,password}=req.body;
      if(!email||!password){
        return next(new ErrorHandler("please Enter Email & Password",400));
      }
      
        
      const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or password",401));
    }
    const isPasswordMatched= await user.comparePassword(password);

  if(!isPasswordMatched){
   
        return next(new ErrorHandler("Invalid Email or password",401));
    
  }
    //   const token=user.getJWTToken();
    //   res.status(200).json({
    //     success:true,
    //     token
    //   })
    sendToken(user,200,res);

    }
    catch(e){
        next(e);
    }
}

// LogOut ----

exports.logOutUser=async (req,res,next)=>{
 
   try{ 
  //   const options={
  //     expires:new Date(Date.now()),
  //     httpOnly:true,
  // };
        
  res.cookie("token", null,{
    expires:new Date(Date.now()),
    httpOnly:true,
});

  res.status(200).json({
    success:true,
    message:"LogOut"
  })
   }

   catch(e){
    return next(e);
   }
    

}

//Forgot Password 

exports.forgotPassword=async (req,res,next)=>{
  try{

      const user= await User.findOne({email:req.body.email});

      if(!user){
        return next( new ErrorHandler("User Not Found", 404));
      }
      const resetToken= user.getResetPasswordToken();
      await user.save({validateBeforSave:false});
             //console.log(user);
      //const resetPasswordUrl=`http://localhost/api/v1/password/reset/${resetToken}/`;
      const resetPasswordUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
      // const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

      const message=`your password reset token is :-  \n\n ${resetPasswordUrl} \n\n if you have not requested this email then,please ignore it`;
     //  console.log("1");
      try{
     //  console.log("2");
           // console.log(user.email);
         await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
         });
        //  console.log("3 ye important hai");
          res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
          })

      }
      catch(err){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
      //  return next(new ErrorHandler("yha h probllem", 500));
        return next(new ErrorHandler(error.message,500));
      }  
  }
  catch(e){
    //console.log("ya yha");
    return next(e);
  }
}
//Reset Password 

exports.resetPassword=async (req,res,next)=>{
  try{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user=await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{ $gt:Date.now()},

    });
    if(!user){
      return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400));

    }
    if(req.body.password!==req.body.confirmPassword){
      return next(new ErrorHandler("Password does not password",400));
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);
  }
  catch(e){
    return next(e);
  }
}


// get user Details

exports.getUserDetails=async (req,res,next)=>{

  try{
     const user=await User.findById(req.user.id);
     res.status(200).json({
      success:true,
      user,
     })
  }
  catch(e){
    return next(e);
  }
}

//update user Password

exports.updatePassword=async (req,res,next)=>{

  try{
    const user=await User.findById(req.user.id).select("+password");
    
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
      return next(new ErrorHandler("old password is incorrect",400));
    }
    if(req.body.newPassword!==req.body.confirmPassword){
      return next(new ErrorHandler("password doest not match", 400));
    }
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
  }
  catch(e){
    return next(e);
  }
}

// update user Profie

exports.updateProfile=async (req,res,next)=>{

  const newUserData={
    name:req.body.name,
    email:req.body.email,
  }
// we will add cloudinary later

   if(req.body.avatar!==""){

     const user=await User.findById(req.user.id);
     const imageId=user.avatar.public_id;

     await cloudinary.v2.uploader.destroy(imageId);
     const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder:"avatars",
      width:150,
      crop:"scale",
     });

     newUserData.avatar={
      public_id:myCloud.public_id,
      url:myCloud.secure_url
     }
   }



  const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  res.status(200).json({success:true});
}

//get all users (admin)

exports.getAllUser=async(req,res,next)=>{
   try{

    const users=await User.find();
  res.status(200).json({
    success:true,
    users,
  })
   }
   catch(e){
    return next(e);
   }
  
}

// get single user (admin)

exports.getSingleUser=async (req,res,next)=>{
  try{

   const user= await User.findById(req.params.id);
   if(!user){
    return next(new ErrorHandler(`User does Not exist with id: ${req.params.id}`))
   }
   res.status(200).json({
    success:true,
    user,
   })

  }
  catch(e){
    return next(e);
  }
}

// update User Role --admin
exports.updateUserRole=async (req,res,next)=>{
  try{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role,
  }
  const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  res.status(200).json({success:true});
}
catch(e){
  return next(e);
}
}

// Delete User -Admin

exports.deleteUser=async (req,res,next)=>{
 
  
  const user=await User.findById(req.params.id);
// we will remove cloudinary later

  if(!user){
    return next(new ErrorHandler(`user does not exist with id:${req.params.id}`))
  }
   //await user.remove();
   const imageId=user.avatar.public_id;
   await cloudinary.v2.uploader.destroy(imageId);

   await User.findByIdAndDelete(req.params.id);

  res.status(200).json({success:true, message:"User deleted succeessfully"});
}
