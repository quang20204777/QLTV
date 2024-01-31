const express = require('express')
const userRouter = express.Router()
const { register, loginUser, loginAdmin, forgotPassword, changePassword, registerAdmin, getAllStudent, updateStudentById, deleteStudentById, updateAccount, getUserByMssv, convertUserOtherSchool } = require('../controller/user.controller')
const { authenticate } = require('../middleware/authentication')
const { adminAuthorize, userAuthorize, userOtherSchoolAuthorize, allAuthorize } = require('../middleware/authorization')

userRouter.post('/registerUser', register)
userRouter.post('/loginUser', loginUser)
userRouter.post('/loginAdmin', loginAdmin)
userRouter.post('/forgotPassword', forgotPassword)
userRouter.post('/changePassword', authenticate, allAuthorize, changePassword)
userRouter.post('/registerAdmin', authenticate, adminAuthorize, registerAdmin) 
userRouter.get('/getAllStudent', authenticate, adminAuthorize, getAllStudent)
userRouter.put('/updateStudent/:id', authenticate, adminAuthorize, updateStudentById)
userRouter.put('/deleteAccount', authenticate, adminAuthorize, deleteStudentById)
userRouter.put('/recreateAccount', authenticate, adminAuthorize, updateAccount)
userRouter.get('/getUserByMssv', getUserByMssv)
userRouter.put('/convertUser', authenticate, userAuthorize, convertUserOtherSchool)

module.exports = {
    userRouter
}