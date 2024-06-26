const mongoose =require("mongoose")
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Your name cannot exceed 30 characters"],
        minLength:[5, "name should have more than 5 character"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email address"]
    },
    password:{

        type:String,
        required:[true,"Please enter your password"],
        minLength:[6,"Your password must be longer than 6 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    allSoftwares:[
        {
            ProductID:{
                type:String,
                
            },
            EndDate:{
                type:Date,
                
            }
        }
    ],
    resetPasswordToken:String,
    resetPasswordExpire:Date

});

//encrypting password before saving user
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})  

//jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
//check password is matched or not
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

//generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    //set token expire time
    this.resetPasswordExpire = Date.now() + 30*60*1000;
    return resetToken;
}




module.exports = mongoose.model("User",userSchema);

