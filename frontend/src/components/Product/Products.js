import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css"
import { useSelector ,useDispatch } from 'react-redux'
import { clearErrors ,getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination"
import Slider from "@material-ui/core/Slider";
import {useAlert} from 'react-alert'
import  Typography  from '@material-ui/core/Typography'
import MetaData from '../layout/MetaData'


const categories = [
    "Telegram",
    "Whatsapp",
    "Facebook",
    "Instagram",
    "Maps",
    "Gmail",
    "SmartPhones",
    ]

const Products = () => {
    const dispatch = useDispatch()
    const [currentPage , setCurrentPage] =useState(1)
    const [category , setCategory] = useState('')
    const alert = useAlert()
    const [ratings , setRatings] = useState(0)
    const { loading, products, error, productsCount , resultPerPage, } = useSelector(state => state.products)
    
    const { keyword } = useParams();
    const [price, setPrice] = useState([1, 1000]);
    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    const priceHandler = (event, newValue) => {
        setPrice(newValue);
    }

    useEffect(() =>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage ,price,category , ratings))
    }, [dispatch , keyword,currentPage,price,category ,ratings,error,alert])



  return (
    <Fragment>
        {loading ? <Loader/> : <Fragment>
            <MetaData title={'Products'}/>
            <h2 className='productsHeading'> Products</h2>
            <div className="products">
                {products && products.map(product => (
                    <ProductCard key={product._id} product={product}/>
                ))}

            
            </div>
            <div className='filterBox'>
                <Typography>Price</Typography>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    // getAriaValueText={valuetext}
                    max={1000}
                    min={0}
                    step={10}
                />
                <Typography>Categories</Typography>
                <ul className='categoryBox'>
                    
                    {categories.map((category) => (
                        <li className='category-link'
                            key= {category}
                            onClick={() => setCategory(category)}

                         >
                            {category}
                        </li>
                            
                        
                    ))}
                </ul>
                <fieldset>
                    <Typography component={'legend'}>Ratings Above</Typography>
                    <Slider 
                        value={ratings}
                        onChange={(e,newRating)=>{
                            setRatings(newRating)
                        }}
                        aria-labelledby='continuous-slider'
                        valueLabelDisplay='auto'
                        max={5}
                        min={0}
                        
                        ></Slider>
                </fieldset>

            </div>


            {resultPerPage < productsCount &&(
                <div className="pagination">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText={'Next'}
                    prevPageText={'Prev'}
                    firstPageText={'First'}
                    lastPageText={'Last'}
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />

             </div>
            )

            }
            


            </Fragment>}
    </Fragment>
    
  )
}

export default Products