const router = require('express').Router();
const ctrl = require('../Controllers/breed');
const upload = require('../Middlewares/upload');
const requireAdmin = require('../Middlewares/requireAdmin');

router.get('/', ctrl.listBreeds);
router.get('/:slug', ctrl.getBreedBySlug);

router.post('/', requireAdmin, ctrl.createBreed);
router.put('/:id', requireAdmin, ctrl.updateBreed);
router.patch('/:id/images', requireAdmin, upload.single('image'), ctrl.updateBreedImage);

module.exports = router;
