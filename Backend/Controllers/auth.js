const UserModel = require('../Models/UsersDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config();
const salt = Number(process.env.Salt_Rounds);
const loginControl = async (req, res) => {  
    try {
        const { email, password } = req.body;
        // console.log(email, password);
        const user = await UserModel.findOne({
            email: email,
        });
        if(!user){
            return res.status(400).json({message: 'User Not Found'});
        }
        const pass_Matched = await bcrypt.compare(password, user.password);
        if(!pass_Matched){
            return res.status(400).json({message: 'Invalid Credentials'});
        }
        // Testing
        // console.log(user);
        const token = jwt.sign({id: user._id, user_name: user.name, type:"user"}, process.env.JWT_SECRET); // currently not added the expiry time
        console.log("Login Successful and The Your Token is: ", token);
        res.status(200).json({ message: 'Login Successful',  success: true, token: token, user_name: user.name });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const signupControl = async (req, res) => {
    try {
        
        const { name, email, password } = req.body.user;
        // console.log(name, email, password);
        const oldUser  =  await UserModel.findOne({
            email: email,
        })
        if(oldUser){
            return res.status(400).json({message: 'User Already Exist By This Email. Please Login'});
        }
        // name need not to be unique 
        // const nameExist  = await UserModel.findOne({
        //     name: name,
        // })
        // if(nameExist){
        //     return res.status(400).json({message: 'User Already Exist By This Name. Please Login'});
        // }
        const newUser = new UserModel({
            name: name,
            email: email,
            password: password,
        });
        const enc_pass = await bcrypt.hash(password, salt);
        newUser.password = enc_pass;
        await newUser.save();
        const user = await UserModel.findOne({
            email: email,
        });
        // console.log(user);

        const token = jwt.sign({id: user._id, user_name: user.name, type:"user"}, process.env.JWT_SECRET); // currently not added the expiry time
        res.status(201).json({ message: 'Signup Successful' ,success: true, token: token, user_name: user.name });
        // console.log(token);
        
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const AdminLoginControl = async (req, res) => {
    try {
        const { email, password } = req.body.user;
        // console.log(email, password);
        const type = req.body.type;
        let control = null;
        if(type === 'vet'){
            control = require('../Models/VetDB');
        }
        else if(type === 'trainer'){
            control = require('../Models/TrainerDB');
        }
        else if(type==="ngo"){
            control = require('../Models/NGO/ngoDB');
        }
        else if(type==="admin"){
            const isEmail = email===process.env["Admin-h-email"];
            const isPass = password===process.env["Admin-h-pass"];
            console.log(email,)
            if(!isEmail || !isPass){
                return res.status(400).json({message: 'Invalid Credentials', success:false});
            }
            const ad_token = jwt.sign({id: "ab00001", user_name: "admin001", type}, process.env.JWT_SECRET);
            return res.status(200).json({ message: 'Login Successful',  success: true, token: ad_token, user_name: "admin" });
        }


        const user = await control.findOne({
            email: email,
        });
        if(!user){
            return res.status(400).json({success:false,message: 'User Not Found'});
        }
        const pass_Matched = await bcrypt.compare(password, user.password);
        if(!pass_Matched){
            return res.status(400).json({success:false,message: 'Invalid Credentials'});
        }
        // Testing
        // console.log(user);
        const token = jwt.sign({id: user._id, user_name: user.name, type}, process.env.JWT_SECRET); // currently not added the expiry time
        // console.log("Login Successful and The Your Token is: ", token);
        res.status(200).json({ message: 'Login Successful',  success: true, token: token, user_name: user.name });
    }
    catch (error) {

        console.log("Error In Admin Control",error);
        res.status(500).json({ error: error.message , success:false});
    }
}
const AdminSignupControl = async (req, res) => {
    try {
        
        const { name, email, password } = req.body.user;
        const type = req.body.type;
        console.log(name, email, password);
        let Vet = require('../Models/VetDB');
        console.log(type);
        if(type === 'vet'){
            Vet = require('../Models/VetDB');
        }
        else if(type === 'trainer'){
            Vet = require('../Models/TrainerDB');
        }
        const oldUser  =  await Vet.findOne({
            email: email,
        })
        if(oldUser){
            return res.status(400).json({message: 'User Already Exist By This Email. Please Login'});
        }
        
        const newUser = new Vet({
            name: name,
            email: email,
            password: password,
        });
        const enc_pass = await bcrypt.hash(password, 12);
        newUser.password = enc_pass;
        await newUser.save();
        const user = await Vet.findOne({
            email: email,
        });
        const token = jwt.sign({id: user._id, user_name: user.name, type}, process.env.JWT_SECRET); // currently not added the expiry time
        res.status(201).json({ message: 'Signup Successful' ,success: true, token: token, user_name: user.name });
        // console.log(token);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const GoogleControl = async (req, res) => {
    try{
        const email = req.body.email;
        const name = req.body.name;
        console.log(email);
        const user = await UserModel.findOne({
            email: email,
        });
        // console.log(user);
        if(user){
            const token = jwt.sign({id: user._id, user_name: name,type:"user"}, process.env.JWT_SECRET);
            let pass_Matched = false;
            if (user.password === 'facebook12345'|| user.password === 'google12345') {
                pass_Matched = true;
            }
            res.status(200).json({ message: 'Login Successful',  success: true, token: token, user_name: name, pass_changed: !pass_Matched });
        }
        else{
            const newUser = new UserModel({
                name: name,
                email: email,
                password: 'google12345',
            });
            const newU = await newUser.save();
            const token = jwt.sign({id: newU._id, user_name: name,type:"user"}, process.env.JWT_SECRET);
            res.status(201).json({ message: 'Signup Successful' ,success: true, token: token, user_name: name,pass_changed: false  });
        }   
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: error.message });
    }

}
const FacebookControl= async (req,res)=>{
    try{
        const { email, name } = req.body;
        // console.log(email);
        const user = await UserModel.findOne({
            email: email,
        })
        if(user){
            const token = jwt.sign({id: user._id, user_name: name,type:"user"}, process.env.JWT_SECRET);
            let pass_Matched = false;
            // console.log(user.password);
            if (user.password === 'facebook12345'|| user.password === 'google12345') {
                pass_Matched = true;
            }
            res.status(200).json({ message: 'Login Successful',  success: true, token: token, user_name: name, pass_changed: !pass_Matched });
        }
        else{
            const newUser = new UserModel({
                name: name,
                email: email,
                password: 'facebook12345',
            });
            const newU = await newUser.save();
            const token = jwt.sign({id: newU._id, user_name: name,type:"user"}, process.env.JWT_SECRET); 
            res.status(201).json({ message: 'Signup Successful' ,success: true, token: token, user_name: name,pass_changed: false  });
        }
    }
    catch(error){
        // For Testing
        // console.log("Error In Facebook Control",error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = { loginControl, signupControl, GoogleControl, AdminLoginControl, AdminSignupControl,FacebookControl };