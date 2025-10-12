const stream = require('stream');
const Breed = require('../Models/Breed');
const cloudinary = require('../Configs/cloudinary');

// list breeds (for grid page)
exports.listBreeds = async (req, res, next) => {
  try {
    const { q, species, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (species) filter.species = species;
    if (q) filter.$or = [
      { breed: new RegExp(q, 'i') },
      { 'general_info.description': new RegExp(q, 'i') }
    ];

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Breed.find(filter)
        .select('breed species slug images')
        .sort({ breed: 1 })
        .skip(skip).limit(Number(limit)),
      Breed.countDocuments(filter)
    ]);

    const data = items.map(b => ({
      id: b.id,
      breed: b.breed,
      species: b.species,
      slug: b.slug,
      images: {
        primary: b.images?.primary?.url || '',
        secondary: b.images?.secondary?.url || ''
      }
    }));

    res.json({ data, pagination: { total, page: Number(page), limit: Number(limit) } });
  } catch (e) { next(e); }
};

// single breed by slug
exports.getBreedBySlug = async (req, res, next) => {
  try {
    const doc = await Breed.findOne({ slug: req.params.slug });
    if (!doc) return res.status(404).json({ message: 'Breed not found' });
    res.json(doc.toJSON());
  } catch (e) { next(e); }
};

// create (admin)
exports.createBreed = async (req, res, next) => {
  try {
    const body = req.body; // same shape as your UI (images can be empty)
    const created = await Breed.create({ ...body, images: { primary: {}, secondary: {} } });
    res.status(201).json(created.toJSON());
  } catch (e) { next(e); }
};

// update (admin)
exports.updateBreed = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const doc = await Breed.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Breed not found' });
    res.json(doc.toJSON());
  } catch (e) { next(e); }
};

// upload/replace one image (admin)
exports.updateBreedImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const type = (req.query.type || '').toLowerCase();
    if (!['primary', 'secondary'].includes(type)) {
      return res.status(400).json({ message: "Query param 'type' must be 'primary' or 'secondary'" });
    }
    if (!req.file) return res.status(400).json({ message: 'Image file is required' });

    const doc = await Breed.findById(id);
    if (!doc) return res.status(404).json({ message: 'Breed not found' });

    // remove old asset
    const oldId = doc.images?.[type]?.public_id;
    if (oldId) { try { await cloudinary.uploader.destroy(oldId); } catch (_) {} }

    // stream upload to Cloudinary
    const folder = `breeds/${doc.slug}`;
    const uploaded = await new Promise((resolve, reject) => {
      const up = cloudinary.uploader.upload_stream(
        { folder, overwrite: true, resource_type: 'image' },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);
      bufferStream.pipe(up);
    });

    doc.images[type] = { url: uploaded.secure_url, public_id: uploaded.public_id };
    await doc.save();

    res.json({ id: doc.id, images: { primary: doc.images.primary.url || '', secondary: doc.images.secondary.url || '' } });
  } catch (e) { next(e); }
};