import { takeLatest, put } from 'redux-saga/effects'
import { STATUS_CODE } from '../../utils/constant/statusCode'
import { rechargeCard, findCardByUserId, createCard, getBalance} from '../../services/CardStudentService'
import { BALANCE_OF_USERID, CHARGE_CARD_USERID, CREATE_CARD_STUDENT } from '../type/CardStudentType'

function* rechargeCardStudent(action) {
    try {
        let promise = yield rechargeCard(action.data.userId, parseInt(action.data.balance.rechargeCard))
        if (promise.status === STATUS_CODE.SUCCESS_PUT) {
            yield put({
                type: CHARGE_CARD_USERID,
                data: promise.status
            })
        }
    }
    catch (err) {
        yield put({
            type: CHARGE_CARD_USERID,
            data: 500
        })
    }
}

function* getBalanceById(action){
    try {
        let promise = yield findCardByUserId(action.data)
        yield put({
            type: BALANCE_OF_USERID,
            data: promise.data.balance
        })
    } catch (error) {
        yield put({
            type: BALANCE_OF_USERID,
            data: "Người dùng chưa có thẻ"
        })
    }
}

function* createCardByMssv(action){
    try {
        let promise = yield createCard(action.data)
        if (promise.status === STATUS_CODE.SUCCESS_PUT) {
            yield put({
                type: CREATE_CARD_STUDENT,
                data: STATUS_CODE.SUCCESS_PUT
            })
        }
    } catch (error) {
        yield put({
            type: CREATE_CARD_STUDENT,
            data: STATUS_CODE.SERVER_ERROR
        })
    }
}

function* getBalanceCardStudent(action){
    try {
        let promise = yield getBalance()
        if(promise){
            localStorage.setItem('balance', promise.data.balance)
            yield put({
                type: 'STATUS_BALANCE',
                data: true
            })
        }
    } catch (error) {
    }
}

export function* getCardStudentSaga() {
    yield takeLatest('RECHARGE_CARD_BY_USERID', rechargeCardStudent)
    yield takeLatest('GET_BALANCE', getBalanceById)
    yield takeLatest('CREATE_CARD', createCardByMssv)
    yield takeLatest('GET_BALANCE_CARD', getBalanceCardStudent)
}
