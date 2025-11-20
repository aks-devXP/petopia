const router = require("express").Router();
const {TrainerValidation} = require("../Middlewares/trainer"); 
const {createTrainer,getTrainer, getTrainerById,getTrainerCategories, deleteTrainer} = require("../Controllers/trainer");
router.get("/all-data",getTrainer);
router.post("/create",TrainerValidation,createTrainer);
router.get("/getCategories",getTrainerCategories);
router.get("/data/:id",getTrainerById);
router.delete("/delete/:id",deleteTrainer);
module.exports = router;

