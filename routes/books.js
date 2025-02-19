import express from "express";
import { addBook, updateBook, deleteBook, getBooks, getBookById, AuthBooks } from "../controllers/books.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

const validateId = [
  check('id').isMongoId().withMessage('Invalid ID format')
];

router.get("/list", getBooks);

router.get("/auth-books", authenticate, AuthBooks);

router.post(
  "/add",
  authenticate,
  check("title").notEmpty().withMessage("Title is required"),
  check("author").notEmpty().withMessage("Author name is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("genre").notEmpty().withMessage("Genre is required"),
  check("publishedYear").notEmpty().withMessage("Published year is required"),
  validate,
  addBook
);

router.put(
  "/:id",
  authenticate,
  validateId,
  validate,
  updateBook
);


router.delete(
  "/:id",
  authenticate,
  validateId,
  validate,
  deleteBook
);

router.get(
  "/:id",
  validateId,
  validate,
  getBookById
);



export { router as booksRoutes };
