import express from "express";
import { login, register } from "../controllers/auth.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validate.js";


const router = express.Router();

router.post(
  "/register",
  check("email").isEmail().withMessage("Enter a valid email"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  validate,
  register
);

router.post(
  "/login",
  check("email").isEmail().withMessage("Enter a valid email"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  validate,
  login
);


export { router as authRoutes };
