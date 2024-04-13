const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config({ path: "backend/config/config.env" });


// Connect to the database
connectDatabase();


// Setting up cloudinary configuration

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// Start the server

const server=app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});

//Unhandled promise rejection 
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    })
})

//uncaught error
process.on("uncaughtException",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    server.close(()=>{
        process.exit(1);
    })
})