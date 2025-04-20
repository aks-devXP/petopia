const Trainer = require('../Models/TrainerDB');

const createTrainer =  async (req, res) => {
  try{
    const { name, email, phone, location, city, zip, experience, description, image, services, price } = req.body;

    // Check if the trainer already exists
    const existingTrainer = await Trainer.findOne({ email:email });
    if (existingTrainer) {
      return res.status(400).json({ message: 'Trainer already exists', success: false });
    }

    // Create a new trainer
    const newTrainer = new Trainer({
      name,
      email,
      phone,
      location,
      city,
      zip,
      experience,
      description,
      image,
      services,
      price
    });

    await newTrainer.save();
    res.status(201).json({ message: 'Trainer created successfully', success: true });
  }
  catch (error) {
    console.error("Error creating trainer:", error.message);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
}

const getTrainer = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json({ trainers, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
}

const updateTrainer = async (req, res) => {
  try{
    const { id } = req.params;
    const { name, email, phone, location, city, zip, experience, description, image, services, price } = req.body;
    // Find the trainer by ID
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found', success: false });
    }
    // Update the trainer's information
    trainer.name = name;
    trainer.email = email;
    trainer.phone = phone;
    trainer.location = location;
    trainer.city = city;
    trainer.zip = zip;
    trainer.experience = experience;
    trainer.description = description;
    trainer.image = image;
    trainer.services = services;
    trainer.price = price;
    await trainer.save();
    res.status(200).json({ message: 'Trainer updated successfully', success: true });
    
  }
  catch (error) {
    console.error("Error updating trainer:", error.message);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
}

module.exports = {
  createTrainer,
  getTrainer, updateTrainer
};