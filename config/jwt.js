import { SignJWT } from "jose";
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



export { signToken };
