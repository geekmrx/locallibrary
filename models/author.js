const mongoose = require("mongoose")

const Schema = mongoose.Schema;

// O schema define um author como String SchemaTypes 
// para first name e family names (com um max 100 characters)
// e Date fields para o date birtth e death
const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100},
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
})

// Virtual for author's full name
AuthorSchema.virtual("name").get(function() {
  // to avoid error in case where an author does not have either a famiy name of  first name
  // We want to make sure we handle the exception by returning an empty for that case
  let fullname = ""
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`
  }

  return fullname
})

// Virtual for author's URL
AuthorSchema.virtual("url").get(function() {
  // We don't use an arrouw function ass we'll need the this object
  return `/catalog/author/${this._id}`

})

// Export model
module.exports = mongoose.model("Author", AuthorSchema)
