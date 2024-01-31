const express = require('express')
const cardStudentRouter = express.Router()
const { authenticate } = require('../middleware/authentication')
const { adminAuthorize, userAuthorize, userOtherSchoolAuthorize, allAuthorize } = require('../middleware/authorization')
const { findById, getAllCard, createCard, updateCard, deleteCard, rechargeCard, findByUserId, getBalance } = require('../controller/cardStudents.controller')
const { checkCardStudents, checkUser } = require('../middleware/validation')

cardStudentRouter.get('/findById/:id', authenticate, userAuthorize, checkCardStudents, findById)
cardStudentRouter.get('/getAllCard', authenticate, userAuthorize, getAllCard)
cardStudentRouter.post('/createCard', authenticate, adminAuthorize, createCard)
cardStudentRouter.put('/updateCard/:id', authenticate, adminAuthorize, checkCardStudents, updateCard)
cardStudentRouter.delete('/deleteCard/:id', authenticate, adminAuthorize, checkCardStudents, deleteCard)
cardStudentRouter.put('/rechargeCard', authenticate, adminAuthorize, checkUser, rechargeCard)
cardStudentRouter.get('/findByUserId', authenticate, adminAuthorize, findByUserId)
cardStudentRouter.get('/getBalance', authenticate, userOtherSchoolAuthorize, getBalance)

module.exports = {
    cardStudentRouter,
}

