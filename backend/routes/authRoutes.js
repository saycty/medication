import express from "express";
import {
  register,
  login,
  getUserProfile,
  refreshAccessToken,
  logout,
} from "../controller/authController.js";
import {
  getWeightData,
  saveWeightData,
} from "../controller/weightController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getUserProfile);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);
router.post("/weight", saveWeightData);
router.get("/weight", getWeightData);
export default router;
