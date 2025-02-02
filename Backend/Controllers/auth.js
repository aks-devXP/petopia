const UserModel = require('../Models/UsersDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const loginControl = async (req, res) => {  
    try {
        const { email, password } = req.body;
        console.log(email, password);
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
        const token = jwt.sign({id: user._id, user_name: user.name}, process.env.JWT_SECRET); // currently not added the expiry time
        console.log("Login Successful and The Your Token is: ", token);
        res.status(200).json({ message: 'Login Successful',  success: true, token: token, user_name: user.name });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const signupControl = async (req, res) => {
    try {
        
        const { name, email, password } = req.body;
        console.log(name, email, password);
        const oldUser  =  await UserModel.findOne({
            email: email,
        })
        if(oldUser){
            return res.status(400).json({message: 'User Already Exist By This Email. Please Login'});
        }
        const nameExist  = await UserModel.findOne({
            name: name,
        })
        if(nameExist){
            return res.status(400).json({message: 'User Already Exist By This Name. Please Login'});
        }
        const newUser = new UserModel({
            name: name,
            email: email,
            password: password,
        });
        const enc_pass = await bcrypt.hash(password, 12);
        newUser.password = enc_pass;
        await newUser.save();
        const user = await UserModel.findOne({
            email: email,
        });

        const token = jwt.sign({id: user._id, user_name: user.name}, process.env.JWT_SECRET); // currently not added the expiry time
        res.status(201).json({ message: 'Signup Successful' ,success: true, token: token, user_name: user.name });
        // console.log(token);
        
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { loginControl, signupControl };