const mongoose = require("mongoose")

const Schema = mongoose.Schema

const BookInstanceSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
    imprint: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ["Available", "Maintencance", "Loaned", "Reserved"],
        defautl: "Maintenance"
    },
    due_back: { type: Date, default: Date.now },
})

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function() {
  // we don't use a arrow function as we'll need this object
  return  "/catalog/bookinstance/" + this._id
})

module.exports = mongoose.model("BookInstance", BookInstanceSchema)
