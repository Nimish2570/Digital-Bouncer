const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const path = require("path");


//setting up config file
if (process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config({ path: "backend/config/config.env" });

  
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
// routes import

const product= require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoutes")
const payment = require("./routes/paymentRoute")

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/api/v1/getkey", (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY,
    });
});
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
    }
);






//middleware for error
app.use(errorMiddleware);



module.exports =app