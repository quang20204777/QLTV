import { takeLatest, put, takeEvery } from 'redux-saga/effects'
import { BORROW_BOOK_BY_USERID, CHECK_ID_BOOK_REDUCER, DELETE_BOOK_BY_ID, FIND_BOOK_BY_TITLE, FIND_MY_BOOK, GET_BOOK_BORROW_BY_STUDENTID, RECREATE_BOOK_BY_ID, UPDATE_BOOK_BY_ID } from '../type/BookType'
import {
    deleteBookById,
    getAllBooks,
    recreateBookById,
    updateBookById,
    createBook,
    borrowBook,
    uploadImage,
    findBookByTitle,
    listBookStudentBorrow,
    giveBook,
    searchBook,
    getBookByIdUnborrow,
    getBookUnborrow
} from '../../services/BookService'
import { getUserByMssv } from '../../services/UserService'
import { STATUS_CODE } from '../../utils/constant/statusCode'


//lấy tát cả quyển sách 
function* getBookBorrowStudent(action) {
    try {
        let promise = yield getAllBooks()
        yield put({
            type: GET_BOOK_BORROW_BY_STUDENTID,
            data: promise.data
        })
    } catch (error) {

    }
}

function* deleteBook(action) {
    try {
        let promise = yield deleteBookById(action.data)
        if (promise.status === STATUS_CODE.SUCCESS)
            yield put({
                type: DELETE_BOOK_BY_ID,
                data: {
                    id: action.data,
                    status: promise.status
                }
            })
    } catch (error) {

    }
}

function* recreateBook(action) {
    try {
        let promise = yield recreateBookById(action.data)
        if (promise.status === STATUS_CODE.SUCCESS) {
            yield put({
                type: RECREATE_BOOK_BY_ID,
                data: {
                    id: action.data,
                    status: promise.status
                }
            })
        }
    } catch (error) {

    }
}

function* updateBook(action) {
    try {
        if (action.data.values === 'errorInput') {
            yield put({
                type: UPDATE_BOOK_BY_ID,
                data: 500
            })
        } else {
            let promise = yield updateBookById(action.data.bookId, action.data.values)
            yield put({
                type: UPDATE_BOOK_BY_ID,
                data: promise.status
            })
        }
    } catch (error) {

    }
}

function* createNewBook(action) {
    try {
        let promise = yield createBook(action.data)
        yield put({
            type: 'VALUE_CREATE_BOOK',
            data: {}
        })
        yield put({
            type: 'ID_BOOK_CREATE',
            data: promise.data.id
        })
    } catch (error) {

    }
}

function* borrowBookSaga(action) {
    try {
        let acc = yield getUserByMssv(action.data.mssv)
        let promise = yield borrowBook(action.data.idBook, acc.data.id)
        if (promise.status === STATUS_CODE.SUCCESS_PUT) {
            yield put({
                type: BORROW_BOOK_BY_USERID,
                data: STATUS_CODE.SUCCESS_PUT
            })
        }
    } catch (error) {
        yield put({
            type: BORROW_BOOK_BY_USERID,
            data: STATUS_CODE.CLIENT_ERROR
        })
    }
}

function* checkIdBook(action) {
    try {
        yield getBookByIdUnborrow(action.data)
        localStorage.setItem('checkIdBook', 'true')
    } catch (error) {
        localStorage.setItem('checkIdBook', 'false')
    }
}

function* uploadImageBook(action) {
    try {
        yield uploadImage(action.data.id, action.data.file)
    } catch (error) {

    }
}

function* getBookByTitle(action) {
    try {
        let response = yield findBookByTitle(action.data)
        if (response) {
            yield put({
                type: FIND_BOOK_BY_TITLE,
                data: {
                    title: action.data,
                    listBook: response.data.listBook,
                    countBook: response.data.countBook
                }
            })
        }
    } catch (error) {

    }
}

function* listBookStudent(action) {
    try {
        let response = yield listBookStudentBorrow()
        if (response) {
            yield put({
                type: FIND_MY_BOOK,
                data: response.data
            })
        }
    } catch (error) {

    }
}

function* giveBookSaga(action) {
    try {
        let response = yield giveBook(action.data.idBook)
        if (response.status === STATUS_CODE.SUCCESS_PUT) {
            localStorage.setItem('giveBookStatus', 'true')
        } else {
            localStorage.setItem('giveBookStatus', 'returned')
        }
    } catch (error) {
        localStorage.setItem('giveBookStatus', 'false')
    }
}

function* searchBookSaga(action) {
    try {
        let response = yield searchBook(action.data)
        localStorage.setItem('bookFilterLibrary', JSON.stringify(response.data))
    } catch (error) {
    }
}

function* getBookUnBorrowSaga(action) {
    try {
        let response = yield getBookUnborrow()
        localStorage.setItem('bookUnborrow', JSON.stringify(response.data))
    } catch (error) {
    }
}

export function* getBookSaga() {
    yield takeLatest('GET_BOOK_BORROW_STUDENT', getBookBorrowStudent)
    yield takeLatest('DELETE_BOOK', deleteBook)
    yield takeLatest('RECREATE_BOOK', recreateBook)
    yield takeLatest('UPDATE_BOOK', updateBook)
    yield takeLatest('CONFIRM_CREATE_BOOK', createNewBook)
    yield takeLatest('BORROW_BOOK', borrowBookSaga)
    yield takeEvery('CHECK_BOOK_ID', checkIdBook)
    yield takeLatest('UPLOAD_IMAGE_BOOK', uploadImageBook)
    yield takeEvery('GET_DATA_BOOK_BY_TITLE', getBookByTitle)
    yield takeLatest('MY_BOOK', listBookStudent)
    yield takeLatest('GIVE_BOOK', giveBookSaga)
    yield takeLatest('SEARCH_BOOK_SAGA', searchBookSaga)
    yield takeLatest('GET_BOOK_UNBORROW', getBookUnBorrowSaga)
}
