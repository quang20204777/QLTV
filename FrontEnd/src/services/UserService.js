import Axios from 'axios'
import { TOKEN_ADMIN, TOKEN_USER } from '../utils/constant/data'
import { DOMAIN_SERVER } from '../utils/constant/domain'

export const loginAdmin = async (mssv, password) => {
    return await Axios.post(`${DOMAIN_SERVER}/users/loginAdmin`, { mssv, password })
}

export const loginUser = async (mssv, password) => {
    return await Axios.post(`${DOMAIN_SERVER}/users/loginUser`, { mssv, password })
}

export const getAllStudent = async () => {
    return await Axios.get(`${DOMAIN_SERVER}/users/getAllStudent`, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const deleteStudent = async (iddb) => {
    return await Axios.put(`${DOMAIN_SERVER}/users/deleteAccount?id=${iddb}`, { params: { id: iddb } }, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const registerUser = async (name, mssv, phoneNumber, email, password, userType) => {
    return await Axios.post(`${DOMAIN_SERVER}/users/registerUser`, { name, mssv, phoneNumber, email, password, userType })
}

export const updateAccount = async (iddb) => {
    return await Axios.put(`${DOMAIN_SERVER}/users/recreateAccount?id=${iddb}`, { params: { id: iddb } }, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const getUserByMssv = async (mssv) => {
    return await Axios.get(`${DOMAIN_SERVER}/users/getUserByMssv?mssv=${mssv}`)
}

export const registerAdmin = async (values) => {
    return await Axios.post(`${DOMAIN_SERVER}/users/registerAdmin`, { name: values.name, mssv: values.mssv, phoneNumber: values.phoneNumber, email: values.email, password: values.password },
        {
            headers: {
                token: localStorage.getItem(TOKEN_ADMIN)
            }
        })
}

export const changePasswordAdmin = async (values) => {
    return await Axios.post(`${DOMAIN_SERVER}/users/changePassword`, values,
        {
            headers: {
                token: localStorage.getItem(TOKEN_ADMIN)
            }
        })
}

export const convertUser = async () => {
    return await Axios.put(`${DOMAIN_SERVER}/users/convertUser`, {},
        {
            headers: {
                token: localStorage.getItem(TOKEN_USER)
            }
        })
}