import Book from "../models/Book.js";

export const renderBookForm = (req, res) => res.render("books/new-book");

export const createNewBook = async (req, res) => {
  const { title, author, publicationYear, state } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Por favor ingrese el titulo." });
  }
  if (!author) {
    errors.push({ text: "Por favor escrita el autor" });
  }
  if (!publicationYear) {
    errors.push({ text: "Por favor ingrese el año de publicación" });
  }
  if (!state) {
    errors.push({ text: "Seleccione un estado" });
  }
  if (errors.length > 0)
    return res.render("books/new-book", {
      errors,
      title,
      author,
      publicationYear,
      state
    });

  const newBook = new Book({ title, author, publicationYear, state });
  newBook.user = req.user.id;
  await newBook.save();
  req.flash("success_msg", "Libro agregado exitosamente");
  res.redirect("/books");
};

export const renderBooks = async (req, res) => {
  const books = await Book.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("books/all-books", { books });
};

export const renderEditForm = async (req, res) => {
  const book = await Book.findById(req.params.id).lean();
  if (book.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/books");
  }
  res.render("books/edit-book", { book });
};

export const updateBook = async (req, res) => {
  const { title, author, publicationYear, state } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author, publicationYear, state });
  req.flash("success_msg", "Libro actualizado exitosamente");
  res.redirect("/books");
};

export const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Libro eliminado exitosamente");
  res.redirect("/books");
};
