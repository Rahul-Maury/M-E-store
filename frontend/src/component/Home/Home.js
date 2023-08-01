//import { CgMouse } from "react-icons/all";
import React, { useEffect } from 'react'
// import Product from './ProductCart.js';
import{clearErrors,getProduct} from "../../actions/productAction.js";
import {useSelector,useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader.js"
import  './Abc.css';
import MetaData from "../layout/MetaData.js";
import ProductCart from './ProductCart.js';
import { useAlert } from "react-alert";


const Home = () => {
  const alert = useAlert();
  const dispatch=useDispatch();

  const {loading,error,products}=useSelector(state=>state.products);
  //console.log(products,"Home");

  useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
     dispatch(getProduct());
  },[dispatch,error,alert]);


  return (
    <>{

      loading?<Loader/>: <>
      <MetaData title="Home page"></MetaData>
       <div className="banner">
         <p>Welcome to <span style={{color:"rgb(216, 54, 52)"}}>Gifts Store</span></p>
         <h1>Find <span style={{color:"rgb(216, 54, 52)"}}>Amazing Surprises</span> Below</h1>
         <a href="#container">
             <button>
                 Scroll 
             </button>
         </a>
       </div>
      
       <h2 className="homeHeading">Feature Products</h2>
       <div className="container" id="container">
         {
           products && products.map((product)=>
           <ProductCart product={product}  key={product._id}/>
           )
         }
         
         </div>
       
 
     </>
    }
    
    
    </>
   
  )
}

export default Home