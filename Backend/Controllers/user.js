const UserModel = require('../Models/UsersDB');

const Contact = require('../Models/ContactDB');
const ContactControl = async (req, res) => {
  const { name, email, category, message } = req.body;
  const contact = new Contact({
    name,
    email,
    category,
    message
  });
  try {
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully. We will get back to you with in 15 days.', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }

};

const getProfileControl = async (req,res)=>{
  try{
    const user_name = req.body.name;
    
    // res.status(200).json({message: 'Profile Info', success: true, user_name: user_name});
  

    const user = await UserModel.findOne({name: user_name, });
    console.log(user);
    if(!user){
      return res.status(400).json({message: 'User not found', success: false});
    }
    res.status(200).json({message: 'Profile Info', success: true, user: user});
  }
  catch(error){
    res.status(500).json({message:'Internal server error', success: false});
  }
}

const postProfileControl = async (req,res)=>{
  try{
    const user_name = req.body.name;
    const user = await UserModel.findOne({name: user_name, });
    console.log(user);
    if(!user){
      return res.status(400).json({message: 'User not found', success: false});
    }
    res.status(200).json({message: 'Profile Info', success: true, user: user});
  }
  catch(error){
    res.status(500).json({message:'Internal server error', success: false});
  }
} 
module.exports = { ContactControl, getProfileControl };

