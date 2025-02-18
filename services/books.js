import { Book } from "../models/Books.js";


const addBook = async (payload) => {
  try {
    return await Book.create(payload);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export { addBook };
