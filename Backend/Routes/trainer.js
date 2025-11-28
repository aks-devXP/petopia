const router = require("express").Router();
const {TrainerValidation} = require("../Middlewares/trainer"); 
const {createTrainer,getTrainer, getTrainerById,getTrainerCategories, deleteTrainer,getProfile,updateTrainer} = require("../Controllers/trainer");
const TokenValidator= require('../Middlewares/TokenValidator');
const allowed_users = require('../Middlewares/allowedUsers');

router.get("/all-data",getTrainer);


// router.post("/create",TrainerValidation,createTrainer);


router.get("/getCategories",getTrainerCategories);


router.get("/profile",TokenValidator,allowed_users(["trainer","admin"]),getProfile)


router.put('/update',TokenValidator,allowed_users(["trainer"]),TrainerValidation,updateTrainer);


router.get("/data/:id",getTrainerById);


router.delete("/delete/:id",deleteTrainer);
module.exports = router;

