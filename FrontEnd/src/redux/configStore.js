import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './saga/rootSaga'
import userReducer from './reducer/UserReducer'
import bookReducer from './reducer/BookReducer'
import cardStudentReducer from './reducer/CardStudentReducer'


const middleWareSaga = createMiddleWareSaga()

const rootReducer = combineReducers({
    // tất cả reducer sẽ định nghĩa tại đây
    userReducer,
    bookReducer,
    cardStudentReducer
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga))
middleWareSaga.run(rootSaga)

export default store