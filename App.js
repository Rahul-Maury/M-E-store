const express=require('express');
const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const cookieParser=require("cookie-parser");
const ErrorMiddlware=require("./Middleware/error");
const order=require("./routes/orderRoute");
const app=express();
const dotenv=require("dotenv");
const fileUpload=require("express-fileupload");
const bodyParser=require("body-parser");
const payment=require("./routes/paymentRoute");
const path=require("path");


//config
dotenv.config({path:"config/config.env"});

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.use(express.static(path.join(__dirname,"./frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./frontend/build/index.html"));
});




app.use(ErrorMiddlware);
module.exports=app;