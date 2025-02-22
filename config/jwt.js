import { jwtVerify, SignJWT } from "jose";
import { envKeys } from "../config/keys.js";

const jwt_Secret = new TextEncoder().encode(envKeys.JWT_SECRET);

const signToken = async (payload) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(jwt_Secret);
  return token;
};

const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, jwt_Secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};/*  */

export { signToken, verifyToken };
