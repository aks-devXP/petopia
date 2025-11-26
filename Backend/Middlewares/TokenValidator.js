// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {userExists}=  require('../Controllers/user');
const {vetExists} = require('../Controllers/vet');
const {ngoExists} = require('../Controllers/NGO/ngo');
const { isTokenExpired } = require('../scripts/isTokenExpired');

const TokenValidator = async (req,res,next)=>{
  try {
    const token = req.headers.authorization.trim();
    const isExpired = isTokenExpired(token);
    if(isExpired){
      return res.status(401).json({success:false, message:"Token has expired."})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let exists = false;
    const type = decoded.type;
    // console.log(decoded);
    if(!type || (type != "user" && type != "vet" && type != "ngo"&& type!="admin")){
      return res.status(401).json({success:false, message: "Invalid token"})
    }
    if (type == "user"){
      exists = await userExists(decoded.id);
      // console.log(decoded.id);
    }
    else if(type == "vet"){
      exists = await vetExists(decoded.id);
    }
    else if (type ==="ngo"){
      exists = await ngoExists(decoded.id);
      // console.log(type);
    }
    else if(type==="admin"){
      const admin_id = process.env["Admin-id"];
      if(decoded.id !==admin_id){
        return res.status(401).json({success:false, message: "Invalid token - entity does not exist"});
      }
      exists = true;
    }
    if (!exists){
      return res.status(401).json({success:false, message: "Invalid token - entity does not exist"});
    }
    req.verified = decoded;
    next(); 
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: "Something went wrong while validating the token"})
  }
};

module.exports = TokenValidator;