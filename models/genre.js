// Require Mongoose
const mongoose = require("mongoose")

// Define a schema
// Schema constructor create new schema instance
const Schema = mongoose.Schema

const GenreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100} 
})

// Virtual for genre's URL
// Nós declaramos uma virtual para o GenreSchema nomeada "url" que 
// return o absolute URL necessário para obter a instância específica do medel
// Usaremos a virtual property em nossos templates sempre que precisarmos
// obter um link em particular genre
GenreSchema.virtual("url").get(function() {
  return `/catalog/genre/${this._id}` // absolute URL
})

// Export function to create model class
// O primeiro argumento é o nome da collection que será criado para o seu model
// (Mongoose criará um database collection para o model)
module.exports = mongoose.model("Genre", GenreSchema)
