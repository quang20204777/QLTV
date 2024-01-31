import { takeLatest, put } from 'redux-saga/effects'
import {
    loginAdmin,
    loginUser,
    getAllStudent,
    deleteStudent,
    registerUser,
    updateAccount,
    registerAdmin,
    changePasswordAdmin,
    getUserByMssv,
    convertUser
} from '../../services/UserService'
import { LOGIN, GET_STUDENT_BY_ADMIN, DELETE_STUDENT_SAGA, UPDATE_ACCOUNT, STATUS_REGISTER_ADMIN, STATUS_CHANGE_PASSWORD_ADMIN, CHECK_MSSV_REDUCER } from '../type/UserType'
import { TOKEN_ADMIN, TOKEN_USER } from '../../utils/constant/data'
import { STATUS_CODE } from '../../utils/constant/statusCode'
import { BORROW_BOOK_BY_USERID } from '../type/BookType'


function* loginAdminSaga(action) {
    let t = 0
    //check xem có phải tài khoản admin không
    if (t === 0) {
        try {
            let promiseAdmin = yield loginAdmin(action.userLogin.mssv, action.userLogin.password)
            t++
            if (promiseAdmin) {
                localStorage.setItem(TOKEN_ADMIN, promiseAdmin.data.token)
                yield put({
                    type: LOGIN,
                    data: {
                        statusLogin: 'ADMIN',
                        dataLogin: {
                            token: promiseAdmin.data.token
                        }
                    }
                })
            }
        } catch (err) {
        }
    }
    //check xem có phải tài khoản user không
    if (t !== 1) {
        try {
            let promiseUser = yield loginUser(action.userLogin.mssv, action.userLogin.password)
            if (promiseUser) {
                localStorage.setItem(TOKEN_USER, promiseUser.data.token)
                yield put({
                    type: LOGIN,
                    data: {
                        statusLogin: 'USER',
                        dataLogin: {
                            token: promiseUser.data.token
                        },
                    }
                })
            }
        } catch (error) {
            localStorage.clear()
            yield put({
                type: LOGIN,
                data: {
                    statusLogin: STATUS_CODE.CLIENT_ERROR,
                }
            })
        }
    }
}

function* getAllStudentSaga() {
    try {
        let promise = yield getAllStudent()
        yield put
            ({
                type: GET_STUDENT_BY_ADMIN,
                data: promise.data
            })
    } catch (error) {
    }
}

function* deleteStudentSaga(action) {
    try {
        let promise = yield deleteStudent(action.id)
        yield put
            ({
                type: DELETE_STUDENT_SAGA,
                data: {
                    status: promise.status,
                    iddb: action.id
                }
            })
    } catch (error) {

    }
}

function* registerSaga(action) {
    try {
        yield registerUser(action.dataRegister.name, action.dataRegister.mssv, action.dataRegister.phoneNumber, action.dataRegister.email, action.dataRegister.password, action.dataRegister.userType)
    } catch (error) {

    }
}

function* updateStudent(action) {
    try {
        let promise = yield updateAccount(action.id)
        yield put
            ({
                type: UPDATE_ACCOUNT,
                data: {
                    status: promise.status,
                    iddb: action.id
                }
            })
    } catch (error) {

    }
}


function* getBookById(action) {
    try {
        yield put({
            type: 'GET_BOOK_USERID',
            data: action.data
        })
    }
    catch (err) {

    }
}

function* registerAdminSaga(action) {
    try {
        const values = {
            name: action.data.name,
            password: action.data.password,
            email: action.data.email,
            phoneNumber: action.data.phoneNumber,
            mssv: action.data.mssv
        }
        let promise = yield registerAdmin(values)
        if (promise.status === STATUS_CODE.SUCCESS_PUT) {
            yield put({
                type: STATUS_REGISTER_ADMIN,
                data: STATUS_CODE.SUCCESS_PUT
            })
        }
    } catch (error) {
        yield put({
            type: STATUS_REGISTER_ADMIN,
            data: STATUS_CODE.SERVER_ERROR
        })
    }
}

function* changePassword(action) {
    try {
        const values = {
            oldPassword: action.data.oldPassword,
            newPassword: action.data.newPassword,
            refillnewPassword: action.data.reNewPassword
        }
        let promise = yield changePasswordAdmin(values)
        if (promise) {
            yield put({
                type: STATUS_CHANGE_PASSWORD_ADMIN,
                data: STATUS_CODE.SUCCESS_PUT
            })
        }
    } catch (error) {
        yield put({
            type: STATUS_CHANGE_PASSWORD_ADMIN,
            data: STATUS_CODE.SERVER_ERROR
        })
    }
}

function* checkMssv(action) {
    try {
        yield getUserByMssv(action.data)
        yield put({
            type: CHECK_MSSV_REDUCER,
            data: true
        })
    } catch (error) {
        yield put({
            type: CHECK_MSSV_REDUCER,
            data: false
        })
    }
}

function* convertUserSaga(action) {
    try {
        const p = yield convertUser()
        console.log(p)
    } catch (error) {
        
    }
}

export function* getUserSaga() {
    yield takeLatest('LOGIN_USER', loginAdminSaga)
    yield takeLatest('GET_ALL_STUDENT', getAllStudentSaga)
    yield takeLatest('DELETE_STUDENT', deleteStudentSaga)
    yield takeLatest('REGISTER_USER', registerSaga)
    yield takeLatest('UPDATE_STUDENT', updateStudent)
    yield takeLatest('GET_DATA_BOOK_BY_USERID', getBookById)
    yield takeLatest('CONFIRM_REGISTER_ADMIN', registerAdminSaga)
    yield takeLatest('CONFIRM_CHANGE_PASSWORD_ADMIN', changePassword)
    yield takeLatest('CHECK_MSSV', checkMssv)
    yield takeLatest('CONVERT_USER_SAGA', convertUserSaga)
}
