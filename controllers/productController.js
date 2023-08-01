
const Product=require("../Modal/productModal");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary=require("cloudinary");

// create Product Admin----
exports.createProducts=async (req,res,next)=>{
    //    const products=new  Product(req.body);
    //    await products.save();
    //   res.status(200).json({
    //     success:true,
    //     products
    //   });
    
    try{
        //    console.log("chla -1",req.body.image);

             let images=[];
             if(typeof req.body.image==="string"){
                images.push(req.body.image);
             }
             else{
                images=req.body.image;
             }
            //  console.log("chla -2");
             const imagesLinks=[];
             for(let i=0; i<images.length; i++){

                const result=await cloudinary.v2.uploader.upload(images[i],{
                    folder:"products",
                });
                imagesLinks.push({
                    public_id:result.public_id,
                    url:result.secure_url
                })
             }
            //  console.log("chla -3");
             req.body.image=imagesLinks;
             req.body.user=req.user.id;

        //   req.body.user=req.user.id;
        const product=await Product.create(req.body);
        res.status(200).json({success:true,
                              product
                            })
    //  console.log(product);
    }
    catch(e){
        console.log("nhi chla -1");
        console.log(e);
        // res.status(200).json({
        //     success:true,
        //     message:"product not created"
        // })
       return  next(e);
    }
  
}

// get ALL product -------
exports.getAllProducts=async (req,res,next)=>{
   
    
    try{// console.log("1");
        
        //console.log("2");
        const resultPerPage=8;
        const productCount=await Product.countDocuments();
      const apifeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
        //const product=await Product.find();
        const products=await apifeature.query;
        res.status(200).json({success:true,products,productCount,resultPerPage});
    }
    catch(e){
       console.log(e);
      return  next(e);
    }
   
}

// get ALL product (Admin)-------
exports.getAdminProducts=async (req,res,next)=>{
   
    
    try{
        
     
      
    const products=await Product.find();

        res.status(200).json({success:true,products});
    }
    catch(e){
       console.log(e);
       return  next(e);
    }
   
}





//get single Product ---


exports.getProducts=async(req,res,next)=>{
    try{
        const product= await Product.findById(req.params.id);
      
       if(!product){
            return next(new ErrorHandler("product Not Found",404));
           // res.status(500).json({success:false,message:"Product Not Found"});
       }
   
       res.status(200).json({success:true,product});

    }
    catch(e){
      //  console.log(e);
        return next(e);
    }
    
}

//update Product ----

exports.updateAllProducts=async( req,res,next)=>{

    try{

        let product= await Product.findById(req.params.id);
        if(!product){
            // res.status(500).json({
            //     success:false,
            //     message:"product Not Found"
            // })
            return next(new ErrorHandler("product Not Found",404));
          
        }

        let images=[];
        if(typeof req.body.image==="string"){
           images.push(req.body.image);
        }
        else{
           images=req.body.image;
        }
        // console.log("images",images);
         if(images!==undefined){
            //Deleting images from cloudinary

            for(let i=0; i<product.image.length; i++){
                await cloudinary.v2.uploader.destroy(product.image[i].public_id);
            }


            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
              const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
              });
        
              imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
              });
            }
        
            req.body.image = imagesLinks;
         }

        product=await Product.findByIdAndUpdate(req.params.id,req.body,
                                                {new :true,
                                                runValidators:true,
                                                useFindAndModify:false
                                              });
    
                                              res.status(200).json({success:true,product});
    }
    catch(e){
       // console.log(e);
       return  next(e);
    }
   
}


exports.deleteProducts=async(req,res,next)=>{

    try{
        const product=await Product.findById(req.params.id);
   // console.log(product);
    if(!product){
       
        return next(new ErrorHandler("product Not Found",404));
      
    }

   //Deleting images from cloudanry

   for(let i=0; i<product.image.length; i++){

    const result=await cloudinary.v2.uploader.destroy(product.image[i].public_id);
   }



    await Product.findByIdAndDelete(req.params.id);
     res.status(200).json({
            success:true,
            message:"product has been deleted successfully"
        })

    }
    catch(e){
        // res.status(200).json({
        //     success:true,
        //     message:"product has been deleted successfully"
        // })
        return next(e);
    }

    
}


// create New Review or Update the review

exports.createProductReview=async(req,res,next)=>{
    try{

    const {rating,comment,productId}=req.body;
    const review={
                user:req.user._id,
                name:req.user.name,
                rating:Number(rating),
                comment,
                
             };

             const product=await Product.findById(productId);
             const isReviewed=product.reviews.find(
                (rev)=>rev.user.toString()===req.user._id.toString()
             );
             
             if(isReviewed){
                product.reviews.forEach((rev)=>{
                    if(rev.user.toString()===req.user._id.toString()){
                        rev.rating=rating,
                        rev.comment=comment;
                    }

                });
             }
             else{
                product.reviews.push(review);
                product.numofReviews=product.reviews.length;
             }
             let avg=0;
             product.reviews.forEach(rev=>{
                avg=avg+rev.rating;
             })
             //console.log(avg);
        
    product.ratings=avg/product.reviews.length
   // console.log(product.reviews.length);
    //console.log(product.ratings);

    await product.save({validateBeforeSave:false});
    res.status(200).json({success:true});

    }
    catch(e){
        return next(e);
    }
}

//get All Reviews of a products

exports.getProdctReviews=async (req,res,next)=>{
    try{
        console.log(req.query.productId);
  const product=await Product.findById(req.query.productId);
 
  if(!product){
    return next(new ErrorHandler("Product not found",404));
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })


    }
    catch(e){
        return next(e);
    }
}

// delete Reviews
exports.deleteReviews=async(req,res,next)=>{
    try{
   const product=await Product.findById(req.query.productId);
   if(!product){
    return next(new ErrorHandler("Prodcut not found", 404));
   }

    const reviews=product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());
  let avg=0;
    reviews.forEach((rev)=>{
        avg+=rev.rating;
    });
    const ratings=avg/reviews.length;
    const numofReviews=reviews.length;
    
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numofReviews
    },
    {
        new:true,
        runValidators:true,
        useFindAndModify:false,

    })


   res.status(200).json({
    success:true
   })

    }
    catch(e){
        return next(e);
    }
}