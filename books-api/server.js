const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

app.use(cors())

const booksController = require('./controllers/books_controller')
app.use('/books', booksController)

app.get('/', (req,res)=>{
    res.send('Hello World!')
})

app.listen(PORT, ()=>{
    console.log('listening on port: ', PORT)
})