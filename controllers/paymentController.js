//const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const dotenv=require('dotenv');
dotenv.config({path:"./config/config.env"});
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// stripe.js
// const stripePackage = require("stripe");

// const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);


// console.log(stripe.paymentIntents);

exports.processPayment = async (req, res, next) => {
    try{
    //  console.log("amount",req.body.amount);

  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });
  // console.log("myPayment",myPayment);
  //  console.log(myPayment.client_secret,"<= client secert");

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
}
catch(e){
    // console.log("error");
    return next(e);
}
};


exports.sendStripeApiKey = async (req, res, next) => {
    try{
        res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY});
    }
    catch(e){
        return next(e);
    }
 
};
