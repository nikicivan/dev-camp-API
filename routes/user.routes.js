import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.controllers.js";
import User from "../models/User.js";
import advancedResults from "../middleware/advancedResults.js";
import { authorize, protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.route("/")
  .get(advancedResults(User), getUsers)
  .post(createUser);

router.route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
