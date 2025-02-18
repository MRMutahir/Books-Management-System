import { Users } from "../models/Users.js";

export const userFindByEmail = async (email) => {
    try {
        return await Users.findOne(email, { password: 1 }).lean();
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};


