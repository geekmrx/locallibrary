const Book = require("../models/book")
const Author = require("../models/author")
const Genre = require("../models/genre")
const BookInstance = require("../models/bookinstance")

const asyncHandler = require("express-async-handler");

// The index controller function needs to fetch infromation about how many
// records we have in the database, render this data in a template to 
// create an HTML page, e depois return em um http response.
//
// Se alguma das database operations fail, the exception que será lançada
// asyncHandler e passada para o next middleware handler 
exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts(in parallet)
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstaces,
    numAuthors,
    numGenres,
    // Como a queries para document counts são independentes umas das outras
    // usamos Promise.all() para run em paralelo.
    // The method return a new promise that we await for completion
    // When all the queries complete, the promise returned by all()
    // - continuing execution of the route handle function
    // - populating the array with the results of the database queries.
  ] = await Promise.all([
      // countDocuments method to get the number of instances of each model.
      // This method is called on a model, and return a Query object.
      // The query ca be executed by calling exec.
      // return a Promise que seja cumprido com um resultado ou rejected
      // se houver um erro no banco de dados.
      Book.countDocuments({}).exec(),
      BookInstance.countDocuments({}).exec(),
      BookInstance.countDocuments({ status: "Available" }).exec(),
      Author.countDocuments({}).exec(),
      Genre.countDocuments({}).exec(),
  ])

  // We then call res.render()
  // - specifying a view (template) named 'index'
  // - objects mapping the results of the database queries to the view template.
  // - Os dados são fornecdios como key-value pairs
  // - can be accessed in the template using the key.
  res.render("index", {
    title: "Local Library Home",
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstaces,
    author_count: numAuthors,
    genre_count: numGenres,
  })


});

// Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book list");
});

// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
});

// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle book create on POST.
exports.book_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create POST");
});

// Display book delete form on GET.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});

