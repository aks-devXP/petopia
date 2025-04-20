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
        // Testing
        // console.log(user);
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

const GenLoginControl = async (req, res) => {
    try {
        const { email, password } = req.body.user;
        console.log(email, password);
        const type = req.body.type;
        let Vet = require('../Models/VetDB');
        if(type === 'vet'){
            Vet = require('../Models/VetDB');
        }
        else if(type === 'trainer'){
            Vet = require('../Models/TrainerDB');
        }

        const user = await Vet.findOne({
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
        const token = jwt.sign({id: user._id, user_name: user.name}, process.env.JWT_SECRET); // currently not added the expiry time
        console.log("Login Successful and The Your Token is: ", token);
        res.status(200).json({ message: 'Login Successful',  success: true, token: token, user_name: user.name });
    }
    catch (error) {

        console.log("Error In Vet Control",error);
        res.status(500).json({ error: error.message });
    }
}
const GenSignupControl = async (req, res) => {
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
        const token = jwt.sign({id: user._id, user_name: user.name}, process.env.JWT_SECRET); // currently not added the expiry time
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
        
        if(!user){
            // const name =  email.split('@')[0];
            console.log(name);
            const newUser = new UserModel({
                name: name,
                email: email,
                password: 'google12345',
            });
            await newUser.save();

            // const user = await UserModel.findOne({
            //     email: email,
            // });
        }
        const token = jwt.sign({id: user._id, user_name: name}, process.env.JWT_SECRET); // currently not added the expiry time
        res.status(201).json({ message: 'Signup Successful' ,success: true, token: token, user_name: name });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }

}

module.exports = { loginControl, signupControl, GoogleControl, GenLoginControl, GenSignupControl };