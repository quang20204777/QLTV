const express = require('express')
const bookRouter = express.Router()
const { checkBook } = require('../middleware/validation')
const { createBook,
    deleteBook,
    getAllBook,
    getBookById,
    updateBook,
    extendBook,
    borrowBook,
    giveBook,
    totalBook,
    unborrowListBook,
    historyBookBorrowOfStudent,
    listUser,
    minTime,
    recreateBookById,
    uploadImageBook,
    findBookByTitle,
    listBookStudentBorrow,
    searchBook,
    getBookByIdUnborrow } = require('../controller/books.controller')
const { authenticate } = require('../middleware/authentication')
const { adminAuthorize, userAuthorize, userOtherSchoolAuthorize, allAuthorize } = require('../middleware/authorization')
const { uploadImage } = require('../middleware/uploadImage')


bookRouter.post('/createBook', authenticate, adminAuthorize, createBook)
bookRouter.put('/deleteBook', authenticate, adminAuthorize, checkBook, deleteBook)
bookRouter.get('/getAllBook', authenticate, allAuthorize, getAllBook)
bookRouter.get('/findById', authenticate, allAuthorize, checkBook, getBookById)
bookRouter.put('/updateBook', authenticate, adminAuthorize, updateBook)
bookRouter.put('/extendBook', authenticate, userAuthorize, extendBook)
bookRouter.put('/borrowBook', authenticate, adminAuthorize, borrowBook)
bookRouter.put('/giveBook', authenticate, allAuthorize, checkBook, giveBook)
bookRouter.get('/totalBook/:name', authenticate, allAuthorize, totalBook)
bookRouter.get('/unborrowListBook', authenticate, allAuthorize, unborrowListBook)
bookRouter.put('/historybookborrowofstudent', authenticate, adminAuthorize, historyBookBorrowOfStudent)
bookRouter.get('/listUser', authenticate, adminAuthorize, listUser)
bookRouter.get('/minTime/:name', authenticate, userAuthorize, minTime)
bookRouter.put('/recreateBookById', authenticate, adminAuthorize, checkBook, recreateBookById)
bookRouter.put('/uploadImage', authenticate, adminAuthorize, uploadImage(), uploadImageBook)
bookRouter.get('/findBookByTitle', authenticate, allAuthorize, findBookByTitle)
bookRouter.get('/listBookStudentBorrow', authenticate, userAuthorize, listBookStudentBorrow)
bookRouter.get('/searchBook', authenticate, userAuthorize, searchBook)
bookRouter.get('/findByIdUnborrow', authenticate, allAuthorize, checkBook, getBookByIdUnborrow)

module.exports = {
    bookRouter,
}