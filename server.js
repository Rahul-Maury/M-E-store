
const app=require("./App")
const dotenv=require('dotenv');
const ConnectDB=require('./config/database')
const cloudinary=require("cloudinary");

dotenv.config({path:"config/config.env"});
console.log(process.env.PORT);
ConnectDB();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT,()=>{
    console.log("server is working ");
})