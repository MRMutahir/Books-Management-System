import { Users } from "../models/Users.js";

const registerUser = async (payload) => {
  try {
    return await Users.create(payload);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export { registerUser };
