const { Book } = await import("../models/Books.js");

export const addBookService = async (payload) => {
  try {
    return await Book.create(payload);
  } catch (error) {
    throw new Error(`Error creating book: ${error.message}`);
  }
};

export const updateBookService = async (id, updateData) => {
  try {

    return await Book.findByIdAndUpdate(id, updateData, { new: true });

  } catch (error) {

    throw new Error(`Error updating book: ${error.message}`);
  }
};

export const deleteBookService = async (id) => {
  try {

    return await Book.findByIdAndDelete(id);

  } catch (error) {
    throw new Error(`Error deleting book: ${error.message}`);
  }
};

export const getBookService = async (id) => {
  try {

    return await Book.findById(id, { user: 0 }).lean()

  } catch (error) {
    throw new Error(`Error deleting book: ${error.message}`);
  }
};

export const getBooksService = async ({ page = 1, limit = 10, search = "" }) => {
  const skip = (page - 1) * limit;

  try {

    const books = await Book.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ],
    }, { user: 0, _id: 0, updatedAt: 0, __v: 0 })
      .skip(skip)
      .limit(limit);


    const totalBooks = await Book.countDocuments({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ],
    });


    return {
      books,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    };
  } catch (error) {
    throw new Error("Error fetching books with pagination and search");
  }
};
