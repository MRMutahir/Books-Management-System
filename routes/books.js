import express from "express";
import { addBook } from "../controllers/books.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/authenticate.js";


const router = express.Router();


router.post(
  "/books",
  authenticate,
  check("title").notEmpty().withMessage("Title is required"),
  check("author").notEmpty().withMessage("Author name is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("genre").notEmpty().withMessage("Genre is required"),
  check("publishedYear").notEmpty().withMessage("Published year is required"),
  validate,
  addBook
);

// router.get("/books", getBooks);

// router.get("/books/:id", getBookById);

// router.put("/books/:id", authenticate, updateBook);

// router.delete("/books/:id", authenticate, deleteBook);

export { router as booksRoutes };
