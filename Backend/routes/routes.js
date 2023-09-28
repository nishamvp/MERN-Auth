import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMIddleware.js";
const router = express.Router();

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)
// router.get("/profile", getUserProfile);
// router.put("/profile", updateUserProfile);

export default router;
