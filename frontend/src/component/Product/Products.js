import React, { useEffect, useState } from 'react'
import './Products.css'
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors,getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader';
import ProductCart from '../Home/ProductCart';
import Pagination from 'react-js-pagination';
import Slider from "@material-ui/core/Slider";
import MetaData from "../layout/MetaData"
import { useAlert } from 'react-alert';
import Typography from "@material-ui/core/Typography";

// const categories = [
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];

const categories=[
  "Birthday",
    "Wedding",
    "Anniversary",
    "Jewelry",
    "Entertaining",
    "Festivals",
    "Electronics",
]


const Products= ({match}) => {
const dispatch=useDispatch();
const alert = useAlert();
const [currentPage,setCurrentPage]=useState(1);
const [price,setPrice]=useState([0,25000]);
const [category, setCategory] = useState("");
const [ratings,setRatings]=useState(0);

const {products,loading,error,productCount,resultPerPage}=useSelector((state)=>state.products);
 
const keyword=match.params.keyword;

const setCurrentPageNo = (e)=>{
  setCurrentPage(e);
}
const priceHandler=(event,newPrice)=>{
  setPrice(newPrice);
}
//console.log(keyword)



useEffect(()=>{
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

    dispatch(getProduct(keyword,currentPage,price,category,ratings,error));
},[dispatch,keyword,currentPage,price,category,ratings,alert,error]);



  return (
   <>
   <MetaData title="PRODUCTS--E-COMMERCE"/>
   {
    loading?<Loader/>:
    <>
      <h2 className='productsHeading'>Products</h2>
      <div className='products'>
         {
          products&&products.map((product)=>(
            <ProductCart  product={product} key={product._id}></ProductCart>
          )
          )
         }

      </div>

      <div className="filterBox">
            <Typography>Price</Typography>
             <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
             
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>



     {resultPerPage<productCount&&(
       <div className='paginationBox'>
       <Pagination
                 activePage={currentPage}
                 itemsCountPerPage={resultPerPage}
                 totalItemsCount={productCount}
                 onChange={setCurrentPageNo}
                 nextPageText="Next"
                 prevPageText="Prev"
                 firstPageText="1st"
                 lastPageText="Last"
                 itemClass="page-item"
                 linkClass="page-link"
                 activeClass="pageItemActive"
                 activeLinkClass="pageLinkActive"
               />
        </div>
     )}
    </>
   }
   
   
   </>
  )
}

export default Products;