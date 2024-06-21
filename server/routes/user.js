import express from "express";
import {
  getMyProfile,
  login,
  logout,
  signup,
  verificationEmail,
  uploadProfilePhoto,
  postaviOglas,
  getCarsFromDb,
  getMyCars,
  deleteCar,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleUpload, multipleUpload } from "./../middlewares/multer.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", signup);

router.get("/profile", isAuthenticated, getMyProfile);

router.post(
  "/profile/uploadProfilePhoto",
  isAuthenticated,
  singleUpload,
  uploadProfilePhoto
);

router.get("/logout", isAuthenticated, logout);

router.get("/:id/verify/:emailToken", verificationEmail);

// DB routes

router.post("/postavi-oglas", isAuthenticated, multipleUpload, postaviOglas);

router.delete("/obrisi-oglas/:id", isAuthenticated, deleteCar);

router.get("/cars-db", getCarsFromDb);

router.get("/my-cars", isAuthenticated, getMyCars);

export default router;
