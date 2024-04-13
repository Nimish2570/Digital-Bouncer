import React, { Fragment, useEffect,useState } from 'react'; import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';

import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import { Dialog,DialogActions ,DialogContent, DialogTitle,Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';


const ProductDetails = ({ match}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.productDetails);

 

  const { success , error:reviewError } = useSelector((state) => state.newReview);  

  const options ={
    value: product.ratings,
    size: "large",
    readOnly: true,
    precision :0.5,
  }

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    console.log(id, " was added  ",quantity);
    alert.success("Item Added to Cart");
  };


  const submitReviewToggle = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const reviewSubmitHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);

    dispatch(newReview(formData));
    setOpen(false);
  }


  useEffect(() => {

    if(error){
      alert.error(error);
       dispatch(clearErrors())
    }
    if (!loading && !error) {
      window.scrollTo(0, 0);
    }
    if(reviewError){
      alert.error(reviewError);
      dispatch(clearErrors())
    }
    if(success){
      alert.success("Review Submitted Successfully");
      dispatch({type:"NEW_REVIEW_RESET"})
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id,error,alert , reviewError,success]);

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
      <MetaData title={`${product.name}`}/>
      <div className="ProductDetails">
        <div>
          
            {product && product.images && product.images.map((item, i) => (
              <img className='CarouselImage' src={item.url} alt={`${i} Slide`} key={item.url} />
            ))}
         
        </div>
        <div>
            <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p> Product # {product._id}</p>
            </div>
            <div className='detailsBlock-2'>
                <Rating {...options} />
                <span className='detailsBlock-2-span'> ({product.numberOfReviews} Reviews) </span>
            </div>
            <div className='detailsBlock-3'>
                <h1>{`₹ ${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                    <div> </div>

                    <p> Select Subscription in Months &nbsp; </p>

                    <div className='detailsBlock-3-1-1'>
                        
                        <button onClick={decreaseQuantity}>-</button>
                        <input readOnly type='number' value={quantity} />
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button disabled={product.Stock< 1? true :false} onClick={addToCartHandler}> Done</button>
                </div>
                <p>
                    Status
                    <b className={product.Stock <1 ? "redColor" : "greenColor"}>
                        {product.Stock <1 ? " OUTDATED" : " UP TO DATE"}
                    </b>
                </p>
            </div>

            <div className='detailsBlock-4'>
                <h3>Description</h3>
                <p>{product.description}</p>
            </div>
            <br></br>
            <div className='detailsBlock-5'>
             
                <a className='fancy' href={product.googleDriveLink} target="_blank" rel="noreferrer">
                <span className="top-key"></span>
                <span className="text">Download the Software</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
                </a>
            </div>

            
            <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>


        </div>
      </div>
      <h2 className='reviewsHeading'>Reviews</h2>

      <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler}  color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      
      {product.reviews && product.reviews[0] ? (
        <div className='reviews'>
         
          {product.reviews.map((review) => (
           <ReviewCard review={review}/>
          ))}
        </div>
      ) : (
        <div className='noReviews'>
          <h2>No Reviews</h2>
        </div>
      )
}
    </Fragment>}
    </Fragment>
   
  );
};

export default ProductDetails;
