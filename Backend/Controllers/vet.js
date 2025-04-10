const VetModel = require('../Models/VetDB');
const ObjectId = require('mongoose').Types.ObjectId;
const getAllVets = async(req,res)=>{
  try{
    const vets = await VetModel.find();
    res.status(200).json({message: 'All vets', success: true, vets: vets});
  }
  catch (error){
    res.status(500).json({message:'Internal server error', success: false});
  }
}

const createVet = async (req, res) => {
  try {
    const { name, email, phone, address, city, state, zip, about, tenure, rating, profilePic , timings} = req.body;
    const existingVet = await VetModel.findOne
    ({
      email: email,
    });
    if (existingVet) {
      return res.status(400).json({ message: 'Vet already exists', success: false });
    }
    // Create a new Vet instance
    const newVet = new VetModel({
      name,
      email,
      phone,  
      address,
      city,
      state,
      zip,    
      about,
      tenure, 
      rating, 
      profilePic,
      timings
    });

    // Save to the database
    await newVet.save();

    res.status(201).json({ message: 'Vet created', success: true });
  } catch (error) {
    console.error("Error creating vet:", error.message);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};
const getVet = async (req, res) => {
  try{
    const id = req.params.id;
    if(!ObjectId.isValid(id)){
      res.status(400).json({error: "Invalid ID Format", success:false})
    }
    const vet = await VetModel.findById(id);
    if(!vet){
      return res.status(404).json({message:'Vet not found', success: false});
    }

    console.log(vet)
    res.status(200).json({message:'Vet found', success: true, vet: vet});
  }
  catch (error) {
    console.log("Error in GetVetById", error)
    res.status(500).json({message:'Internal server error', success: false});
  }

}


module.exports = {getAllVets, createVet, getVet}