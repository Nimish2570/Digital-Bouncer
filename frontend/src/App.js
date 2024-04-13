import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import UserOptions from './components/layout/Header/UserOptions';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';
import ResetPassword from './components/User/ResetPassword.js';
import Cart from './components/Cart/Cart.js';
import Shipping from './components/Cart/Shipping.js';
import ConfirmOrder from './components/Cart/ConfirmOrder.js';
import axios from 'axios';
import store from './store';
import Payment from './components/Cart/Payment.js';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct.js';
import OrderList from './components/Admin/OrderList.js';
import ProcessOrder from './components/Admin/ProcessOrder.js';
import UsersList from './components/Admin/UsersList.js';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/productReviews';
import Contact from './components/layout/Contact/Contact'
import About from './components/layout/About/About'
import NotFound from './components/layout/NotFound/NotFound';




function App() {
  
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const stripeApiKey = "pk_test_51OuxwWSJ41Ch2U7R0EiSc2EziuQJk7eFaNI84NVyZ2UcabMV6yMfMrxBoXHs9lDqb1qWtaQRY0KQFbKF2QP6R1Rt0018NqJEXN";
  
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    
    store.dispatch(loadUser());


    
  }, []);

  
  

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      
 
      <Routes>
        <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
     
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:keyword" element={<Products />} />
        {isAuthenticated ? (
          <Route path="/account" element={<Profile/>} />
         
        ) : 
        (
          <Route path="/login" element={<LoginSignUp />} />
        )}
        {isAuthenticated?
        <Route path="/me/update" element={<UpdateProfile />} />
        : <Route path="/login" element={<LoginSignUp />} />
        }
        {isAuthenticated?
        <Route path="/password/update" element={<UpdatePassword />} />
        : <Route path="/login" element={<LoginSignUp />} />
        }
        {isAuthenticated?
        <Route path="/shipping" element={<Shipping />} /> : <Route path="/login" element={<LoginSignUp />} />}
        {isAuthenticated?
        <Route path="/order/confirm" element={<ConfirmOrder />} /> : <Route path="/login" element={<LoginSignUp />} />}
        {isAuthenticated?
        <Route path="/success" element={<OrderSuccess />} /> : <Route path="/login" element={<LoginSignUp />} />}
        {isAuthenticated?
        <Route path="/orders" element={<MyOrders />} /> : <Route path="/login" element={<LoginSignUp />} />
        }
        {isAuthenticated?
        <Route path="/order/:id" element={<OrderDetails />} /> : <Route path="/login" element={<LoginSignUp />} />
        }
        {isAuthenticated?
        <Route path="/admin/dashboard" element={<Dashboard />} /> : <Route path="/login" element={<LoginSignUp />} />
        }
        {isAuthenticated?
        <Route path="/admin/products" element={<ProductList />} /> : <Route path="/login" element={<LoginSignUp />} />
        }
        {isAuthenticated?
        <Route path="/admin/product" element={<NewProduct />} /> : <Route path="/login" element={<LoginSignUp />} />
        }
        {isAuthenticated?
        <Route path="/admin/product/:id" element={<UpdateProduct />} /> : <Route path="/login" element={<LoginSignUp />} />
        }
        
        {isAuthenticated?
        <Route path="/admin/orders" element={<OrderList />} /> : <Route path="/login" element={<LoginSignUp />} />
        }
        
        
         {isAuthenticated?
        <Route path="/admin/users" element={<UsersList />} /> : <Route path="/login" element={<LoginSignUp />} />
        } 
        {isAuthenticated?
        <Route path="/admin/user/:id" element={<UpdateUser />} /> : <Route path="/login" element={<LoginSignUp />} />
        }
        {isAuthenticated?
        <Route path="/admin/reviews" element={<ProductReviews />} /> : <Route path="/login" element={<LoginSignUp />} />
        }



        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />


        <Route path="/login"  element={<LoginSignUp />} />
        <Route path= '/cart' element= {<Cart />} />
        
     
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
