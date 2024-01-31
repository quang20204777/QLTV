import { STATUS_CODE } from "../../utils/constant/statusCode"
import { BALANCE_OF_USERID, CHARGE_CARD_USERID, CREATE_CARD_STUDENT, GET_USERID_CLICK, SUBMIT_CHARGE } from "../type/CardStudentType"

const cardStudentData = {
    userIdClick: null,
    status: 500,
    clickCharge: 0,
    //balance là số dư tài khoản của người dùng
    balance: null,
    //statusCreate cho biết status khi create card 
    statusCreate: null,
    statusBalance: null
}
const cardStudentReducer = (state = cardStudentData, action) => {
    switch (action.type) {
        case GET_USERID_CLICK: {
            state.userIdClick = action.data
            return { ...state }
        }
        case CHARGE_CARD_USERID: {
            if (action.data === 201) {
                state.status = 201
            } else {
                state.status = 500
            }
            return { ...state }
        }
        case SUBMIT_CHARGE: {
            state.clickCharge = action.data
            return { ...state }
        }
        case BALANCE_OF_USERID: {
            state.balance = action.data
            return { ...state }
        }
        case CREATE_CARD_STUDENT: {
            if (action.data === STATUS_CODE.SUCCESS_PUT) {
                state.statusCreate = STATUS_CODE.SUCCESS_PUT
            } else if (action.data === STATUS_CODE.SERVER_ERROR) {
                state.statusCreate = STATUS_CODE.SERVER_ERROR
            } else {
                state.statusCreate = null
            }
            return { ...state }
        }
        case 'STATUS_BALANCE':{
            state.statusBalance = action.data
            return {...state}
        }
        default: {
            return { ...state }
        }
    }
}

export default cardStudentReducer