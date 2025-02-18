import { verifyToken } from "../config/jwt.js";
import { sendResponse } from "../helpers/common.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendResponse(
      res,
      "Authorization header missing or malformed",
      true,
      401
    );
  }
  const token = authHeader.split(" ")[1]

  if (!token) {
    return sendResponse(res, "Authentication token missing", true, 401);
  }

  try {
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return sendResponse(res, "Invalid or expired token", true, 401);
  }
};

export { authenticate };
