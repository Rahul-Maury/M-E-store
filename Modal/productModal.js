
const mongoose=require('mongoose');
const productSchems= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the  Product Name"]
    },
    price:{
        type:Number,
        required:[true,"pleae Enter Product Prices"],
        maxLength:[8,"price can not exceed 8 digit"]
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Descriptions"]
    },
    category:{
        type:String,
        required:[true,"please Enter the product Category"]
    },
   
   
    image:
       [ {
        public_id:{
            type:String,
            required :true
        },
        url:{
            type:String,
            required:true
        }
    },
]
    ,
    ratings:{
        type:Number,
        default:0,
       
    }, 


   stock:{
    type:Number,
    required:[true,"please Enter the Number of Stock"],
    default:1,
    maxLength:[4,"Stock Can not Exceed 4 characters"]
   },
   numofReviews:{
    type:Number,
    default:0
   },
   reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
             required:true,
              },


        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
           required:true
        }
    },
    ],
    
 user:{
  type:mongoose.Schema.ObjectId,
  ref:"User",
   required:true,
    },

    createAt:{
        type:Date,
        default:Date.now
    }
   
   
})

module.exports=mongoose.model("product",productSchems);