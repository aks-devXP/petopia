const Pet = require('../Models/PetDB');
const User = require('../Models/UsersDB');
const ObjectId = require('mongoose').Types.ObjectId;
const createPet = async (req, res) => {
  try{
    let { name, age, category, breed,photo } = req.body;
    name = name.trim().toLowerCase();
    age = parseInt(age);
    category = category.trim().toLowerCase();
    breed = breed.trim().toLowerCase();
    // console.log(name, age, category, breed, photo);
    const userId = req.verified.id; 
    const newPet = new Pet({
      name: name,
      age: age,
      category: category,
      breed: breed,
      photo:photo
    })
    const {_id} = await newPet.save();
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.petID.push(_id);
    await user.save();
    // console.log('Pet Created Successfully');
    res.status(201).json({ message: 'Pet Created Successfully', success: true });

  }
  catch (error) {
    console.error('Error creating pet:', error);
    res.status(500).json({ error: error.message });
  }
}

const getAllPets = async (req, res) => {
  try {
    const userId = req.verified.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const pets = user.petID;
    // console.log('Pets:', pets);
    let petInfo = [];
    for (let i = 0; i < pets.length; i++) {
      const pet = await Pet.findById(pets[i]);
      if (pet) {
        petInfo.push(pet);
      }
    }
    // console.log('Pet Info:', petInfo);
    res.status(200).json({ message: 'Pets fetched successfully', success:true, petInfo });
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: error.message, success:false });
  }
}



const updatePet = async (req, res) => {
  try {
    const petInfo = req.body;
    const petId = petInfo._id;
    // console.log("Pet ID:", petId);

    if (!ObjectId.isValid(petId)) {
      return res.status(400).json({ error: 'Invalid pet ID' });
    }

    const pet_data = await Pet.findById(petId);
    if (!pet_data) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    // Update fields
    pet_data.name = petInfo.name;
    pet_data.age = petInfo.age;
    pet_data.category = petInfo.category;
    pet_data.breed = petInfo.breed;
    pet_data.photo = petInfo.photo;
    await pet_data.save();

    console.log('Pet updated successfully');
    res.status(200).json({ message: 'Pet updated successfully', success: true });
  } catch (error) {
    console.log("Error in Updating the pet (Controller):", error, "\nPet Id:", req.body?._id);
    res.status(500).json({ message: error.message, success: false });
  }
};


const deletePet = async(req,res)=>{
  try {
    const petId = req.params.id;
    if (!ObjectId.isValid(petId)) {
      return res.status(400).json({ error: 'Invalid pet ID' });
    }
    pet_data = await Pet.findByIdAndDelete(petId);
    if (!pet_data) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    const userId = req.verified.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const petIndex = user.petID.indexOf(petId);
    if (petIndex > -1) {
      user.petID.splice(petIndex, 1);
      await user.save();
    }
    //  else {
    //   return res.status(404).json({ message: 'Pet not found in user\'s pets' });
    // }
    console.log('Pet deleted successfully');
    res.status(200).json({ message: 'Pet deleted successfully', success:true });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ error: error.message, success:false });
  }
  
}


module.exports = { createPet, getAllPets, updatePet, deletePet };
