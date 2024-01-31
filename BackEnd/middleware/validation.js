const { Books, Card, Users, Places } = require('../models')

//check xem dữ liệu đầu vào id của book có tồn tại hay không
const checkBook = async (req, res, next) => {
    const id = req.query.id
    const book = await Books.findOne({
        where: {
            id: id
        }
    })
    if (book) {
        next()
    } else {
        res.status(400).send(`Cannot find book with id = ${id}`)
    }
}
//kiem tra id ton tai hay khong
const checkCardStudents = async (req, res, next) => {
    const id = req.params.id
    const cardStudent = await Card.findOne({
        where: { id: id }
    })
    if (cardStudent) {
        next()
    } else {
        res.status(400).send(`Cannot find card student with id = ${id}`)
    }
}

const checkPlace = async (req, res, next) => {
    const id = req.params.id
    const place = await Places.findOne({
        where: { id: id }
    })
    if (place) {
        next()
    } else {
        res.status(400).send(`Cannot find place with id = ${id}`)
    }
}

//Kiem tra user co ton tai k
const checkUser = async (req, res, next) => {
    const id = req.query.id
    const user = await Users.findOne({
        where: { id: id }
    })
    if (user) {
        next()
    } else {
        res.status(400).send(`Cannot find user with id = ${id}`)
    }
}

//Kiểm tra xem chỗ ngồi có tồn tại hay không, nếu tồn tại thì check xem đã có người đặt chỗ đó chưa
const checkPositionPlace = async (req, res, next) => {
    const { userId } = req.user
    const { positionPlace } = req.body
    const position = await Places.findOne({
        where: {
            positionPlace: positionPlace
        }
    })
    if (position) {
        if (position.dataValues.userId === null) {
            next()
        } else {
            if (position.dataValues.userId == userId) {
                res.status(400).send("You has been booked this position place")
            } else {
                res.status(400).send("Position place has been booked")
            }
        }
    } else {
        res.status(400).send("Position place doesn't exist")
    }
}

module.exports = {
    checkBook,
    checkCardStudents,
    checkUser,
    checkPlace,
    checkPositionPlace
}