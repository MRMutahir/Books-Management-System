import { signToken } from "../config/jwt.js";
import { comparePassword, hashPassword, sendResponse } from "../helpers/common.js";
import { registerUser } from "../services/auth.js";
import { userFindByEmail } from "../services/users.js";

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, "Email and Password are required", false, 400);
  }

  try {
    const existingUser = await userFindByEmail({ email });
    if (existingUser) {
      return sendResponse(
        res,
        "Email is already in use. Please choose another email address.",
        false,
        409
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await registerUser({ email, password: hashedPassword });

    if (user) {
      return sendResponse(res, "User registered successfully", true, 201);
    } else {
      return sendResponse(res, "Registration failed", false, 500);
    }
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {

  const { email, password } = req.body;

  try {
    const user = await userFindByEmail({ email });
    if (!user) {
      return sendResponse(res, "Invalid credentials", false, 404);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return sendResponse(res, "Invalid credentials", false, 401);
    }

    const authToken = await signToken({ userID: user._id });

    return sendResponse(res, "Login successful", true, 200, authToken);

  } catch (error) {
    next(error);
  }
};