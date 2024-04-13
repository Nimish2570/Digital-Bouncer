import React from 'react'
import { Link } from 'react-router-dom'

import { Rating } from '@material-ui/lab'





const ProductCard = ({ product}) => {
  const options ={
    size:"small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
}
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}></img>
        <p>{product.name}</p>
        
        <div className='productCard__info'>
           
            <Rating {...options}/> 
            <span className="productCardSpan">
              {" "}
              ({product.numberOfReviews} Reviews)
            </span>
            
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
    
  )
}

export default ProductCard