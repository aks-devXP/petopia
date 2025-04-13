const UserModel = require('../Models/UsersDB');
const Appointment = require('../Models/AppointmentsDB');
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
    // const user_name = req.verified.user_name;
    const id = req.verified.id;
    // console.log(id);
    // res.status(200).json({message: 'Profile Info', success: true, user_name: user_name});
  
    console.log("User ID", id);
    const user = await UserModel.findById(id);
    console.log(user.name);
    if(!user){
      return res.status(400).json({message: 'User not found', success: false});
    }
    res.status(200).json({message: 'Profile Info', success: true, user: user});
  }
  catch(error){
    res.status(500).json({message:'Internal server error', success: false});
  }
}

const updateProfileControl = async (req, res) => {
  try {
    const mongoose = require("mongoose");

    const _id = req.verified.id;
    // console.log(_id);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user_data = await UserModel.findById(_id);
    // Testing
    // console.log(user_data);
   
    if (!user_data) {
      return res.status(404).json({ error: "User not found" });
    }


    const user = req.body.user;
    // console.log(req.body, "user data in update profile control");
    // Testing
    // console.log(user, "user data in update profile control");
    // return res.status(200).json({ message: "Profile Info Updated Successfully", success: true });
    if (user.name && user.name !== user_data.name) {
      // Check for duplicate name
      // Decided name need not to be unique
      user_data.name = user.name;
    }

    if (user.email && user.email !== user_data.email) {
      // Check for duplicate email
      const oldUser = await UserModel.find({ email: user.email });

      if (oldUser.length > 1) {
        return res.status(400).json({ message: "User Already Exist By This Email.", success: false });
      }
      user_data.email = user.email;

    }

    if (user_data.phone === undefined) {
      user_data.phone = user.phone;
    }
    else if (user.phone && Number(user.phone) !== user_data.phone) {
      // Error Occurred here:
        //1. Comparing String with Number
      // console.log(user_data.phone, "user phone in  profile ", user.phone, "user phone in update profile control");
      if (user.phone.length !== 10) {
        return res.status(400).json({ message: "Phone number should be 10 digits.", success: false });
      }
      console.log(user.phone.length, "user phone length in update profile control");
      const valid = await UserModel.find({ phone: user.phone });
      
      if (valid.length == 1) {
        return res.status(400).json({ message: "Phone number already exists.", success: false });
      }
      // console.log(valid, "valid phone number in update profile control");
      user_data.phone = user.phone;
    }
    // Not using currently on frontend
    user_data.age = user.age;

    // Has removed from model fields
    // user_data.petStatus = user.petStatus;
    user_data.address = user.address;
    user_data.city = user.city;
    user_data.state = user.state;
    user_data.profileColor = user.profileColor;
    // console.log(user_data.profileColor, "user profile color in update profile control");
    user_data.nameColor = user.nameColor;
    await user_data.save();

    // Send response of success
    return res.status(200).json({ message: "Profile Info Updated Successfully", success: true });

  } catch (error) {
    console.log(error, "error in update profile control");
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
const updatePasswordControl = async (req, res) => {
  try {
    const user_name = req.verified.user_name;
    // Testing
    console.log(user_name);
    const { oldPassword, newPassword } = req.body;
    const user = await UserModel.findOne
      ({ name: user_name });
    if (!user) {
      return res.status(400).json({ message: 'User not found', success: false });
    }
    const bcrypt = require('bcrypt');
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password', success: false });
    }
    const enc_pass = await bcrypt.hash(newPassword, 12);
    user.password = enc_pass;
    await user.save();
    res.status(200).json({ message: 'Password updated successfully', success: true });

}
catch (error) {
  console.log(error,"error in update password");
  res.status(500).json({ message: 'Internal server error', success: false });
}
};


// Appointment Middleware
const createAppointmentControl = async (req, res) => {
  try{
    const {user_id,type, authority_id,pet_id,  date, time, status, description} = req.body.appointment;
    const userid = req.verified.id;
    const pet = require('../Models/PetDB');
    const pet_data = await pet.findById(pet_id);
    if(!pet_data){
      return res.status(400).json({message: 'Pet not found', success: false});
    }

    const type1 = type.toLowerCase();
    if (type1 === "vet"){
      const VetModel = require('../Models/VetDB');
      const vet = await VetModel.findById(authority_id);
      if (!vet){
        return res.status(400).json({message: 'Vet not found', success: false});
    }
  }
  // else if (type1 === "groomer"){
      // first data Model need to be implemented
    // }
    else if (type1 === "trainer"){
      const trainerModel = require('../Models/TrainerDB');
      const trainer = await trainerModel.findById(authority_id);
      if (!trainer){
        return res.status(400).json({message: 'Trainer not found', success: false});
      }
    }
    else{
      return res.status(400).json({message: 'Invalid appointment type', success: false});
    }

    const appointment = new Appointment({
      type:type1,
      authority_id,
      user_id,
      date,
      time,
      status,
      description,
      pet_id: pet_id,
      created_at: Date.now()
    });
    await appointment.save();
    res.status(201).json({message: 'Appointment created successfully', success: true});
    
  }
  catch(error){
    console.log(error,"error in create appointment control");
    return res.status(500).json({message:'Internal server error ', success: false});
  }
};

// Update Appointment Control
const updateAppointmentControl = async (req, res)=>{
  try{
    const {appointment_id, appointment} = req.body;

  if(!appointment_id){
      return res.status(400).json({message: 'Appointment ID is required', success:
      false});
  }


    const mongoose = require("mongoose");
    if(!mongoose.Types.ObjectId.isValid(appointment_id)){
      return res.status(400).json({message: 'Invalid appointment ID', success: false});
    }
    let appointment_data = await Appointment.findById(appointment_id);
    if(!appointment_data){
      return res.status(400).json({message: 'Appointment not found', success: false});}

    // update all the fields
    appointment_data.type = appointment.type.toLowerCase();
    appointment_data.authority_id = appointment.authority_id;
    appointment_data.date = appointment.date;
    appointment_data.time = appointment.time;
    appointment_data.status = appointment.status;
    appointment_data.description = appointment.description;

  // save the updated data
    await appointment_data.save();
    res.status(200).json({message: 'Appointment updated successfully', success: true});
  }

  catch(error){
    console.log(error,"error in update appointment control");

    return res.status(500).json({message:'Internal server error ', success: false});
  }

}


// Get All Appointments For a User
const getAllAppointmentControl = async (req, res) => {
  try {
    const user_id = req.verified.id;
    // console.log(user_id, "user id in get appointment control");
    let appointments = await Appointment.find({ user_id: user_id });
    appointments.sort((a,b)=> b.created_at - a.created_at);
    // console.log(appointments, "appointments in get appointment control");
    res.status(200).json({ message: 'Appointments', success: true, appointments: appointments });
  }
  catch (error) {
    console.log(error, "error in get appointment control");
    return res.status(500).json({ message: 'Internal server error ', success: false });
  }
};

const deleteAppointmentControl = async (req, res) => {
  try{
    const {appointment_id} = req.body;
    if(!appointment_id){
      return res.status(400).json({message: 'Appointment ID is required', success: false});
    }
    const mongoose = require("mongoose");
  if(!mongoose.Types.ObjectId.isValid(appointment_id)){
    res.status(400).json({message: 'Invalid appointment ID', success: false});
  
  }
  let appointment_data = await Appointment.findById(appointment_id);
  if(!appointment_data){
    return res.status(400).json({message: 'Appointment not found', success: false});
  }
  await Appointment.deleteOne({_id: appointment_id});
  res.status(200).json({message: 'Appointment deleted successfully', success: true});

  }

  catch(error){
    console.log(error,"error in delete appointment control");

    return res.status(500).json({message:'Internal server error ', success: false});
  }
};


module.exports = { ContactControl, getProfileControl, updateProfileControl, updatePasswordControl, createAppointmentControl, updateAppointmentControl, getAllAppointmentControl, deleteAppointmentControl };



