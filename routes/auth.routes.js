import express from "express";
import {
  forgotPassword,
  getMe,
  login,
  logout,
  register,
  resetPassword,
  updateDetails,
  updatePassword,
} from "../controllers/auth.controllers.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(protect, getMe);
router.route("/updatedetails").put(protect, updateDetails);
router.route("/updatepassword").put(protect, updatePassword);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resettoken").put(resetPassword);

export default router;
