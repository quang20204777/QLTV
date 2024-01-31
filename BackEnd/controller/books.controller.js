const { DATE } = require('sequelize')
const { Books, Users } = require('../models')
const { statusBook } = require('../constant/index')
const { Op } = require("sequelize");

const getAllBook = async (req, res) => {
    try {
        const books = await Books.findAll()
        if (books) {
            res.status(200).send(books)
        } else {
            throw new Error('Cannot get all books')
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

const getBookById = async (req, res) => {
    const { id } = req.query
    try {
        const book = await Books.findOne({
            where: {
                id: id
            }
        })
        if (book) {
            res.status(200).send(book)
        } else {
            throw new Error(`Cannot get book by id = ${id}`)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

const createBook = async (req, res) => {
    try {
        const { name, author, title, countPage, year, positionBook } = req.body
        const newBook = await Books.create({ name, author, title, countPage, year, positionBook, status: '0' })
        if (newBook) {
            res.status(201).send(newBook)
        }
        else {
            throw new Error('Cannot create book')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateBook = async (req, res) => {
    const { id } = req.query
    const { name, author, title, countPage, year, positionBook } = req.body
    try {
        const book = await Books.update({ name: name, author: author, title: title, countPage: countPage, year: year, positionBook: positionBook }, {
            where: {
                id,
            }
        })
        if (book) {
            res.status(201).send(`Update book success with book id is ${id}`)
        } else {
            throw new Error("Update book failure with book id is ${id}")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.query
        const deleteBook = await Books.update({ status: '1' }, {
            where: {
                id: id
            }
        });
        if (deleteBook) {
            res.status(200).send("delete book success")
        } else {
            throw new Error("Cannot delete book")
        }
    } catch (e) {
        res.status(500).send(e)
    }
}
//Gia hạn mượn Sách
const extendBook = async (req, res) => {
    try {
        //Lấy id của sách
        const { id } = req.query
        const book = await Books.findOne({
            where: {
                id,
            }
        })
        const dateNow = new Date()
        const endDate = new Date(book.endDate).getTime()
        const newEndDate = endDate + 14 * 24 * 3600 * 1000
        if (book) {
            if (book.dataValues.userId) {
                //Kiểm tra sách đã được gia hạn chưa
                if (book.status === statusBook.notExtend) {
                    //So sánh thời gian hiện tại có nằm trong khoảng mượn-hạn trả
                    if (dateNow < newEndDate) {
                        const updateBook = await Books.update({
                            status: statusBook.extended,
                            endDate: newEndDate
                        }, {
                            where: {
                                id,
                            }
                        })
                        if (updateBook) {
                            res.status(201).send("Extend successful!")
                        } else {
                            res.status(500).send("Couldn't update this book")
                        }
                    }
                    //Thời giạn hiện tại lớn hơn newEndDate 
                    else {
                        const updateBook = await Books.update({
                            status: statusBook.expired,
                        }, {
                            where: {
                                id,
                            }
                        })
                        if (updateBook) {
                            res.status(201).send("Your loan period has expired. Please return of the library.")
                        } else {
                            res.status(500).send("Couldn't update this book")
                        }
                    }
                }
                //Nếu sách đã được gia hạn
                else if (book.status === statusBook.extended) {
                    //Kiểm tra endDate với thời gian hiện tại
                    //Nếu còn hạn mượn sách
                    if (endDate > dateNow) {
                        //Hien thi so ngay muon con lai
                        const remainDay = ((endDate - dateNow) / (24 * 3600 * 1000)).toFixed()
                        res.status(200).send(`Remaining days of borrowing book is ${remainDay} day`)
                    }
                    //Nếu sách hết hạn 
                    else {
                        const updateBook = await Books.update({
                            status: statusBook.expired,
                        }, {
                            where: {
                                id,
                            }
                        })
                        if (updateBook) {
                            res.status(201).send("Your loan period has expired. Please return of the library.")
                        } else {
                            res.status(500).send("Couldn't update this book")
                        }
                    }
                }
                //Nếu sách đã hết hạn và status đang là : time borrow book is expired
                else if (book.status === statusBook.expired) {
                    res.status(200).send("Your loan period has expired. Please return of the library.")
                }
            } else {
                res.status(200).send(`This book wasn't borrowed`)
            }
        } else {
            throw new Error(`Couldn't find book by id is ${id}`)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}
//Mượn sách borrowBook( mượn sách theo idBook)
const borrowBook = async (req, res) => {
    const { idBook, userId } = req.body
    const dateNow = new Date()
    const newEndDate = new Date(dateNow).getTime() + 60 * 24 * 3600 * 1000
    try {
        const books = await Books.findAll({
            where: {
                id: {
                    [Op.in]: idBook
                }
            }
        })
        let t = 0  //0 là đúng
        books.forEach(async (book) => {
            if (book && t === 0) {
                //Kiểm tra sách đã được mượn hay chưa
                if (!book.dataValues.userId) {
                    //Chưa được mượn--cập nhật dayBorrow, userId, endDate
                    const updateBook = await Books.update({ userId: userId, dayBorrow: dateNow, endDate: newEndDate }, {
                        where: {
                            id: book.dataValues.id,
                        }
                    })
                    if (!updateBook) {
                        t = 1   //1 là lỗi update phía server
                    }
                } else {
                    t = 2    //2 là do sách đá được mượn
                }
            } else {
                t = 2
            }
        })
        setTimeout(() => {
            if (t === 1) {
                res.status(500).send("Borrow book error!")
            } else if (t == 2) {
                res.status(500).send("Book borrowed!")
            } else {
                res.status(201).send("Success borrow book!")
            }
        }, 200)
    } catch (e) {
        res.status(500).send(e)
    }
}
//Trả sách giveBook
const giveBook = async (req, res) => {
    const { id } = req.query
    try {
        const book = await Books.findOne({
            where: {
                id,
            }
        })
        if (book) {
            if (book.dataValues.userId !== null) {
                const updateBook = await Books.update({
                    userId: null,
                    dayBorrow: null,
                    status: statusBook.notExtend,
                    endDate: null
                }, {
                    where: {
                        id,
                    }
                })
                if (updateBook) {
                    res.status(201).send("Give book successful!")
                } else {
                    res.status(500).send("Give book failed!")
                }
            } else {
                res.status(200).send("The book has been returned")
            }
        } else {
            throw new Error(`Couldn't find book by this id ${id}`)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

const totalBook = async (req, res) => {
    const { name } = req.params
    try {
        const books = await Books.findAll({
            where: {
                name: {
                    [Op.substring]: `${name}`,
                },
                userId: null,
            }
        })
        const data = {
            "totalBook": books.length
        }
        if (books) {
            res.status(200).send(data)
        } else {
            res.status(500).send("Can't get total book")
        }
    } catch (e) {
        res.status(500).send(e)
    }
}
//Liệt kê những cuốn sách chưa được mượn
const unborrowListBook = async (req, res) => {
    try {
        const book = await Books.findAll({
            where: {
                userId: null,
            }
        })
        if (book) {
            res.status(200).send(book)
        } else {
            throw new Error("Fail to list unborrowed books!")
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

//xem lịch sử mượn sách của sinh viên về sách chưa trả
const historyBookBorrowOfStudent = async (req, res) => {
    const { id } = req.query
    try {
        const user = await Users.findOne({
            where: {
                id: id
            }
        })
        if (user) {
            const book = await Books.findAll({
                where: {
                    userId: id,
                    status: '0'
                }
            })
            if (book) {
                res.status(200).send(book)
            }
            else {
                res.status(500).send("Can't find books user borrow")
            }
        } else {
            throw new Error("Can't find id of user")
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

const listUser = async (req, res) => {
    try {
        const user = await Users.findAll()
        const arrayUserId = user.map((item) => {
            return item.dataValues.id
        })
        let arrayRes = []
        for (let i = 0; i < arrayUserId.length; i++) {
            const item = arrayUserId[i]
            const listBook = await Books.findAll({
                where: {
                    userId: item,
                }
            })
            const books = listBook.map((item) => {
                return item.dataValues
            })
            const nameUser = await Users.findOne({
                where: {
                    id: item,
                }
            })
            arrayRes[arrayRes.length] = {
                id: item,
                nameUser: nameUser.dataValues.name,
                listBookBorrow: books
            }
        }
        res.status(200).send(arrayRes)
    } catch (e) {
        res.status(500).send(e)
    }
}

//Lay ra thoi gian ngan nhat sinh vien co the muon sach
const minTime = async (req, res) => {
    const { name } = req.params
    const allBook = await Books.findAll({
        where: {
            name: {
                [Op.substring]: `${name}`,
            }
        }
    })
    if (allBook.length) {
        const allNames = allBook.map(element => {
            return element.name
        })
        const allNameDistince = new Set(allNames)
        let arrayRes = []
        const allName = []

        allNameDistince.forEach((name) => {
            allName.push(name)
        })
        allName.forEach((name, index) => {
            const books = allBook.filter(element => element.dataValues.name == name)
            const dateNow = new Date()
            let book1 = books.filter(book => book.userId == null)
            if (book1.length) {
                book1.forEach(element => arrayRes.push(element))
            }
            else {
                let book2 = books.map((book, index) => {
                    let endDate
                    if (book.status === '0') {
                        endDate = new Date(book.endDate).getTime() + 14 * 24 * 3600 * 1000
                    } else {
                        endDate = new Date(book.endDate).getTime()
                    }
                    const count = Number(((endDate - dateNow) / (24 * 3600 * 1000)).toFixed())
                    return {
                        id: book.id,
                        name: book.name,
                        countDate: count,
                        endDate: new Date(endDate)
                    };
                })
                let minDate = book2[0].countDate
                let bookEarly = book2[0]
                const length_book2 = book2.length
                for (let i = 1; i < length_book2; i++) {
                    if (minDate > book2[i].countDate) {
                        minDate = book2[i].countDate
                        bookEarly = book2[i]
                    }
                }
                arrayRes.push(bookEarly)
            }
        })

        const dataRes = []
        arrayRes.forEach(element => {
            const data = {
                "name": element.name,
                "minDate": element.endDate ? element.endDate : "Còn sách"
            }
            dataRes.push(data)
        })
        res.status(200).send(dataRes)
    } else {
        res.status(500).send(`Cannot find book has name is ${name}`)
    }

}

const recreateBookById = async (req, res) => {
    const { id } = req.query
    try {
        const recreateBook = await Books.update({ status: '0' }, {
            where: {
                id,
            }
        })
        if (recreateBook) {
            res.status(200).send(`Recreate book with id=${id} success`)
        } else {
            throw new Error('Recreate book error')
        }
    } catch (error) {
        res.status(500).send(`Cannot recreate book with id = ${id}`)
    }
}

const uploadImageBook = async (req, res) => {
    try {
        const image = req.file
        const { id } = req.query
        const book = await Books.update({ urlImage: image.filename }, {
            where: {
                id,
            }
        })
        if (book) {
            res.status(201).send('upload image book success')
        } else {
            throw new Error('Upload image for book is error!')
        }
    } catch (error) {
        res.status(401).send(error)
    }
}

const findBookByTitle = async (req, res) => {
    try {
        const { title } = req.query
        const books = await Books.findAll({
            where: {
                title,
            }
        })
        let resBook = books.map((item) => {
            return item.dataValues
        })
        if (resBook) {
            let response = {
                listBook: resBook,
                countBook: resBook.length
            }
            res.status(200).send(response)
        } else {
            throw new Error('Cannot find book by title')
        }
    } catch (error) {
        res.status(401).send(error)
    }
}

//xem danh sách mượn sách của sinh viên khi sinh viên đăng nhập
const listBookStudentBorrow = async (req, res) => {
    const { userId } = req.user
    try {
        const user = await Users.findOne({
            where: {
                id: userId
            }
        })
        if (user) {
            const book = await Books.findAll({
                where: {
                    userId: userId,
                    status: '0'
                }
            })
            if (book) {
                res.status(200).send(book)
            }
            else {
                res.status(500).send("Can't find books user borrow")
            }
        } else {
            throw new Error("Can't find id of user")
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

//search book theo name
const searchBook = async (req, res) => {
    try {
        const { name } = req.query
        const books = await Books.findAll({
            where: {
                name: {
                    [Op.substring]: name
                }
            }
        })
        if (books) {
            res.status(200).send(books)
        } else {
            throw new Error(`Not found by name book`)
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

const getBookByIdUnborrow = async (req, res) => {
    const { id } = req.query
    try {
        const book = await Books.findOne({
            where: {
                id: id,
                userId: null
            }
        })
        if (book) {
            res.status(200).send(book)
        } else {
            throw new Error(`Cannot get book by id = ${id}`)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    createBook,
    deleteBook,
    getAllBook,
    getBookById,
    updateBook,
    extendBook,
    borrowBook,
    giveBook,
    totalBook,
    unborrowListBook,
    historyBookBorrowOfStudent,
    listUser,
    minTime,
    recreateBookById,
    uploadImageBook,
    findBookByTitle,
    listBookStudentBorrow,
    searchBook,
    getBookByIdUnborrow
}