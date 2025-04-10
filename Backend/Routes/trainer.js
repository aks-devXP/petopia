const router = require("express").Router();
const {TrainerValidation} = require("../Middlewares/trainer"); 
const {createTrainer,getTrainer} = require("../Controllers/trainer");
router.get("/all-data",getTrainer);
router.post("/create",TrainerValidation,createTrainer);
module.exports = router;

