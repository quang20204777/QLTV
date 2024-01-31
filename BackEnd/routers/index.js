const express = require('express')
const rootRouter = express.Router()
const { bookRouter } = require('./books.router')
const { userRouter } = require('./users.router')
const { placesRouter } = require('./places.router')
const { cardStudentRouter } = require('./cardStudents.router')

rootRouter.use('/books', bookRouter)
rootRouter.use('/users', userRouter)
rootRouter.use('/places', placesRouter)
rootRouter.use('/cardStudents', cardStudentRouter)

module.exports = {
    rootRouter
}