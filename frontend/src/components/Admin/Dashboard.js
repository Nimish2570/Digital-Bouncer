import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line , } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

import {  Chart,CategoryScale } from "chart.js";

import chartJs from "chart.js/auto";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {error, products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);


  
  let outOfStock = 0;
  products && products.forEach((product) => {
    if (product.Stock === 0) {
      outOfStock += 1;
    }
  });  
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.allUsers);
  



  let totalAmount = 0;

  orders && orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out Dated", "Up to date"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
         data: [outOfStock, products && products.length - outOfStock],
      },
    ],
  };

  chartJs.register(CategoryScale);

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> 
              ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>


          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState}  />

        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState}  />
        </div>
       
      </div>
    </div>
  );
};

export default Dashboard;