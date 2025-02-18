
import { sendResponse } from "../helpers/common.js";
import { addBookService, deleteBookService, getBookService, getBooksService, getUserAuthBooksService, updateBookService } from "../services/books.js";


export const addBook = async (req, res, next) => {
  try {

    const { title, author, description, genre, publishedYear } = req.body;
    const { userID } = req.user

    await addBookService({ title, author, description, genre, publishedYear, user: userID });

    return sendResponse(res, "Book added successfully", true, 201);


  } catch (error) {
    next(error);
  }
};


export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateData = req.body;

    const updatedBook = await updateBookService(id, updateData);

    if (!updatedBook) {
      return sendResponse(res, "Book not found", false, 404);
    }

    return sendResponse(res, "Book updated successfully", true, 200);

  } catch (error) {
    next(error);
  }
};


export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedBook = await deleteBookService(id);

    if (!deletedBook) {
      return sendResponse(res, "Book not found", false, 404);
    }

    return sendResponse(res, "Book deleted successfully", true, 200);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await getBookService(id);

    if (!book) {
      return sendResponse(res, "Book not found", false, 404);
    }


    return sendResponse(res, "Book retrieved successfully", true, 200, book);

  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req, res) => {
  const { page, limit, search } = req.query;

  try {

    const { books, totalBooks, totalPages } = await getBooksService({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      search: search || "",
    });


    sendResponse(res, "Books retrieved successfully", true, 200, {
      books,
      totalBooks,
      totalPages,
      currentPage: parseInt(page) || 1,
    })

  } catch (error) {
    next(error)
  }
};


export const AuthBooks = async (req, res, next) => {
  try {
    const { page, limit, search } = req.query;
    const { userID } = req.user
  
    const { books, totalBooks, totalPages } = await getUserAuthBooksService({
      userID,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      search: search || "",
    });

    sendResponse(res, "Books retrieved successfully", true, 200, {
      books,
      totalBooks,
      totalPages,
      currentPage: parseInt(page),
    });

  } catch (error) {
    next(error);
  }
};


