import express from "express";
import {getUser, updateUser} from "../controllers/user.js";


const router = express.Router();


router.get("/user", getUser);
router.post("/user", updateUser);

export default router;