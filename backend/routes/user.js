import express from "express";
import {getUser, updateUser} from "../controllers/user.js";
import {requestResetPassword, resetPassword} from"../controllers/resetPassword.js"


const router = express.Router();

/* GET USER DATA */
router.get("/user", getUser);
router.post("/user", updateUser);

/* FORGOT PASSWORD */
router.post("/requestResetPassword", requestResetPassword);
router.post("/resetPassword", resetPassword);

export default router;