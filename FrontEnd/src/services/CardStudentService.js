import Axios from 'axios'
import { TOKEN_ADMIN, TOKEN_USER } from '../utils/constant/data'
import { DOMAIN_SERVER } from '../utils/constant/domain'

export const rechargeCard = async (id, balance) => {
    return await Axios.put(`${DOMAIN_SERVER}/cardStudents/rechargeCard?id=${id}`, { balance: balance }, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const findCardByUserId = async (userId) => {
    return await Axios.get(`${DOMAIN_SERVER}/cardStudents/findByUserId?userId=${userId}`, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const createCard = async (values) => {
    return await Axios.post(`${DOMAIN_SERVER}/cardStudents/createCard`, values, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const getBalance = async () => {
    return await Axios.get(`${DOMAIN_SERVER}/cardStudents/getBalance`, {
        headers: {
            token: localStorage.getItem(TOKEN_USER)
        }
    })
}

