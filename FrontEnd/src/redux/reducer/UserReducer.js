import { CHECK_MSSV_REDUCER, DELETE_STUDENT_SAGA, GET_STUDENT_BY_ADMIN, LOGIN, STATUS_CHANGE_PASSWORD_ADMIN, STATUS_REGISTER_ADMIN, UPDATE_ACCOUNT, VALUE_CHANGE_PASSWORD_ADMIN, VALUE_REGISTER_ADMIN } from "../type/UserType"
import { STATUS_CODE } from '../../utils/constant/statusCode'

const userLoginData = {
    dataLogin: {},
    //status cho biết trạng thái đăng nhập
    status: 400,
    getAllStudent: [],
    //valueRegisterAdmin cho biết dữ liệu điền vào form đăng ký admin
    valueRegisterAdmin: {},
    //statusRegisterAdmin cho biết status trả về khi đăng ký admin
    statusRegisterAdmin: null,
    //valueChangePasswordAdmin cho biết dữ liệu điền vào form đổi mật khẩu của admin
    valueChangePasswordAdmin: {},
    //statusRegisterAdmin cho biết status trả về khi đăng ký admin
    statusChangePasswordAdmin: null,
    //check mssv
    checkMssv: null,
}

const userReducer = (state = userLoginData, action) => {
    switch (action.type) {
        case LOGIN: {
            state.status = action.data.statusLogin
            state.dataLogin = { ...action.data.dataLogin }
            return { ...state }
        }
        case GET_STUDENT_BY_ADMIN: {
            let arrayStudent = []
            let t = 1
            action.data.forEach((item) => {
                arrayStudent.push({
                    "iddb": item.id,
                    "id": t,
                    "name": item.name,
                    "mssv": item.mssv,
                    "phoneNumber": item.phoneNumber,
                    "email": item.email,
                    "createdAt": item.createdAt,
                    "isDelete": item.isDelete,
                    "userType": item.userType
                })
                t++;
            })
            state.getAllStudent = arrayStudent
            return { ...state }
        }
        case DELETE_STUDENT_SAGA: {
            let array = []
            if (action.data.status === STATUS_CODE.SUCCESS_PUT) {
                state.getAllStudent.forEach((item) => {
                    if (item.iddb === action.data.iddb) {
                        item.isDelete = 1
                    }
                    array.push(item)
                })
            }
            state.getAllStudent = [...array]
            return { ...state }
        }
        case UPDATE_ACCOUNT: {
            let array = []
            if (action.data.status === STATUS_CODE.SUCCESS_PUT) {
                state.getAllStudent.forEach((item) => {
                    if (item.iddb === action.data.iddb) {
                        item.isDelete = 0
                    }
                    array.push(item)
                })
            }
            state.getAllStudent = [...array]
            return { ...state }
        }
        case VALUE_REGISTER_ADMIN: {
            state.valueRegisterAdmin = action.data
            return { ...state }
        }
        case STATUS_REGISTER_ADMIN: {
            state.statusRegisterAdmin = action.data
            return { ...state }
        }
        case VALUE_CHANGE_PASSWORD_ADMIN: {
            state.valueChangePasswordAdmin = action.data
            return { ...state }
        }
        case STATUS_CHANGE_PASSWORD_ADMIN: {
            state.statusChangePasswordAdmin = action.data
            return { ...state }
        }
        case CHECK_MSSV_REDUCER: {
            state.checkMssv = action.data
            return { ...state }
        }
        default: {
            return { ...state }
        }
    }
}

export default userReducer