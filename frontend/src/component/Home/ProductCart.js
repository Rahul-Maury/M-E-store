import { Rating } from '@material-ui/lab'
import React from 'react'
import {Link} from 'react-router-dom'
// import ReactStars from "react-rating-stars-component";
const ProductCart = ({product}) => {
  
  const options = {
    size: "medium",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
     
    <Link className="productCard" to={`/product/${product._id}`}>
       <img src={product.image[0].url} alt={product.name}></img>
       <p>{product.name}</p>
       <div>
        <Rating {...options} /><span>({product.numofReviews} Reviews)</span>
       </div>
       <span>{`Rs.${product.price}`}</span>


    </Link>
  )
}

export default ProductCart