const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  // You can create references from one document/model instance
  // to another using the ObjectId schema field. 
  // The field stores the id of the related model.
  // ref property -> informa ao schema qual model pode ser assigned para este field
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }]
})

BookSchema.virtual("url").get(function() {
  return `/catalog/book/${this._id}`
})

// Exporting the method to create the model
module.exports = mongoose.model("Book", BookSchema)
