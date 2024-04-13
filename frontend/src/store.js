import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";
import * as productReducers from "./reducers/productReducer";
import * as userReducers from "./reducers/userReducer";
import * as orderReducers from "./reducers/orderReducer";
import * as cartReducers from "./reducers/cartReducer";

const rootReducer = combineReducers({
  products: productReducers.productsReducer,
  productDetails: productReducers.productDetailsReducer,
  user: userReducers.userReducer,
  profile: userReducers.profileReducer,
  forgotPassword: userReducers.forgotPasswordReducer,
  cart: cartReducers.cartReducer,
  newOrder: orderReducers.newOrderReducer,
  myOrders: orderReducers.myOrdersReducer,
  orderDetails: orderReducers.orderDetailsReducer,
  newReview: productReducers.newReviewReducer,
  newProduct: productReducers.newProductReducer,
  product: productReducers.productReducer,
  allOrders: orderReducers.allOrdersReducer,
  order: orderReducers.orderReducer,
  allUsers: userReducers.allUsersReducer,
  userDetails: userReducers.userDetailsReducer,
  productReviews: productReducers.productReviewsReducer,
  review: productReducers.reviewReducer,
});

const initialState = {
  cart: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
  },
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
