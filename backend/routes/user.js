import express from "express";
import {addIngredient, getFromPantry, user} from "../controllers/user.js";


const router = express.Router();


router.get("/user", user);


router.post("/pantry", addIngredient);
router.get("/pantry", getFromPantry);


export default router;