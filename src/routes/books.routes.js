import { Router } from "express";

import {
  renderBookForm,
  createNewBook,
  renderBooks,
  renderEditForm,
  updateBook,
  deleteBook,
} from "../controllers/books.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

router.get("/books/add", isAuthenticated, renderBookForm);
router.post("/books/new-book", isAuthenticated, createNewBook);
router.get("/books", isAuthenticated, renderBooks);
router.get("/books/edit/:id", isAuthenticated, renderEditForm);
router.put("/books/edit-book/:id", isAuthenticated, updateBook);
router.delete("/books/delete/:id", isAuthenticated, deleteBook);

export default router;