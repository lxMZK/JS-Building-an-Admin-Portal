const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
    title: String,
    desc: String,
    year: Number,
    quantity: Number,
    img: String
})

module.exports = mongoose.model('Book', bookSchema)