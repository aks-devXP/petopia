const AdoptionPet = require('../Models/AdoptionPetDB');
const User = require('../Models/UsersDB');

const createAdoptionPet = async (req, res) => {
  try {
    let { name, age, category, breed, description, image } = req.body;
    name = name.trim().toLowerCase();
    age = parseInt(age);
    category = category.trim().toLowerCase();
    breed = breed.trim().toLowerCase();
    description = description?.toString()?.trim();
    image = image?.toString()?.trim();

    const userId = req.verified.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const pet = new AdoptionPet({
      name,
      age,
      category,
      breed,
      description,
      image,
      city: (user.city || '').toString().trim(),
      contactName: user.name || '',
      contactPhone: user.phone?.toString() || '',
      contactEmail: user.email || '',
      lister: userId,
      isActive: true,
    })
    await pet.save();
    return res.status(201).json({ success: true, message: 'Adoption listing created' });
  } catch (error) {
    console.error('Error creating adoption pet:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getPublicPets = async (req, res) => {
  try {
    const { city } = req.query;
    const filter = { isActive: true };
    if (city && city.trim()) {
      filter.city = new RegExp(`^${city.trim()}$`, 'i');
    }
    const pets = await AdoptionPet.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, pets });
  } catch (error) {
    console.error('Error fetching adoption pets:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { createAdoptionPet, getPublicPets };

