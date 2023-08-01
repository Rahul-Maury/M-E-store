const Order=require("../Modal/orderModal");
const Product=require("../Modal/productModal");
const ErrorHandler=require("../utils/errorhandler");

// create new order
exports.newOrder=async (req,res,next)=>{
    try{
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          } = req.body;
        
          const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
          });

          res.status(200).json({
            success:true,
            order,
          })
    }
    catch(e){
        return next(e);
    }
}

// get single order

exports.getSingleOrder=async (req,res,next)=>{

    try{
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandler("order not found with this id", 404));
    }
    res.status(200).json({
        success:true,
        order,
    })
    }
    catch(e){
        return next(e);
    }
}

// get logged in user Orders
exports.myOrders=async (req,res,next)=>{
   // console.log(req.user._id);
    try{
        
    const orders=await Order.find({user:req.user._id});
     // console.log(orders);
    res.status(200).json({
        success:true,
        orders
    })
}
catch(e){
    console.log("sdfdsf");
    return next(e);
}
}

//get all order --admin

exports.getAllOrders=async (req,res,next)=>{
    // console.log(req.user._id);
     try{
         
     const orders=await Order.find();
      // console.log(orders);

      let totalAmount=0;
      orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
      })

     res.status(200).json({
         success:true,
         totalAmount,
         orders
     })
 }
 catch(e){
     console.log("sdfdsf");
     return next(e);
 }
 }
 

 // update Order Status -- Admin
exports.updateOrder = async (req, res, next) => {
    try{
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHander("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  }
  catch(e){
    console.log("ye wali error");
    return next(e);
  }
}

  
  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
  
  // delete Order -- Admin
  exports.deleteOrder = async (req, res, next) => {

     try{
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    await Order.findByIdAndRemove(req.params.id);
  
    res.status(200).json({
      success: true,
    });
}
 catch(e){
    return next(e);
 }
  };
  