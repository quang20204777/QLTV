import Axios from 'axios'
import { TOKEN_ADMIN, TOKEN_USER } from '../utils/constant/data'
import { DOMAIN_SERVER } from '../utils/constant/domain'

export const historyBookBorrowOfStudent = async (id) => {
    return await Axios.put(`${DOMAIN_SERVER}/books/historybookborrowofstudent?id=${id}`, { params: { id: id } }, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const getAllBooks = async () => {
    const token = localStorage.getItem(TOKEN_ADMIN) ? localStorage.getItem(TOKEN_ADMIN) : localStorage.getItem(TOKEN_USER)
    return await Axios.get(`${DOMAIN_SERVER}/books/getAllBook`, {
        headers: {
            token: token
        }
    })
}

export const deleteBookById = async (id) => {
    return await Axios.put(`${DOMAIN_SERVER}/books/deleteBook?id=${id}`, { params: { id: id } }, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const recreateBookById = async (id) => {
    return await Axios.put(`${DOMAIN_SERVER}/books/recreateBookById?id=${id}`, { params: { id: id } }, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const updateBookById = async (id, values) => {
    return await Axios.put(`${DOMAIN_SERVER}/books/updateBook?id=${id}`, values,
        {
            headers: {
                token: localStorage.getItem(TOKEN_ADMIN)
            }
        })
}

export const createBook = async (values) => {
    return await Axios.post(`${DOMAIN_SERVER}/books/createBook`, { name: values.name, author: values.author, title: values.title, countPage: values.countPage, year: values.year, positionBook: values.positionBook },
        {
            headers: {
                token: localStorage.getItem(TOKEN_ADMIN)
            }
        })
}

export const borrowBook = async (idBook, userId) => {
    return await Axios.put(`${DOMAIN_SERVER}/books/borrowBook`, {idBook: idBook, userId: userId},
    {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
            }
        })
}

export const getBookById = async (id) => {
    return await Axios.get(`${DOMAIN_SERVER}/books/findById?id=${id}`, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const uploadImage = async (id, file) => {
    return await Axios.put(`${DOMAIN_SERVER}/books/uploadImage?id=${id}`, file, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN),
            "Content-Type": "multipart/form-data",
        }
    })
}

export const findBookByTitle = async (title) => {
    return await Axios.get(`${DOMAIN_SERVER}/books/findBookByTitle?title=${title}`, {
        headers: {
            token: localStorage.getItem(TOKEN_USER)
        }
    })
}

export const listBookStudentBorrow = async () => {
    return await Axios.get(`${DOMAIN_SERVER}/books/listBookStudentBorrow`, {
        headers: {
            token: localStorage.getItem(TOKEN_USER)
        }
    })
}

export const giveBook = async (id) => {
    return await Axios.put(`${DOMAIN_SERVER}/books/giveBook?id=${id}`, { params: { id: id } }, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const searchBook = async (value) => {
    return await Axios.get(`${DOMAIN_SERVER}/books/searchBook?name=${value}`, {
        headers: {
            token: localStorage.getItem(TOKEN_USER)
        }
    })
}

export const getBookByIdUnborrow = async (id) => {
    return await Axios.get(`${DOMAIN_SERVER}/books/findByIdUnborrow?id=${id}`, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}

export const getBookUnborrow = async () => {
    return await Axios.get(`${DOMAIN_SERVER}/books/unborrowListBook`, {
        headers: {
            token: localStorage.getItem(TOKEN_ADMIN)
        }
    })
}