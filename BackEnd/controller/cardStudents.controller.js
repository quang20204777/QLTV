const { Card, Users } = require('../models/index')
const { Op } = require('sequelize')

//cron job
var CronJob = require('cron').CronJob;
var job = new CronJob(
    '0 0 1 * *',   //mồng 1 mỗi tháng sẽ trừ tiền
    async function () {
        const cards = await Card.findAll({
            where: {
                userId: {
                    [Op.ne]: null
                },
                balance: { //tài khoản phải lớn hơn 10000 mới được trừ
                    [Op.gt]: 10000
                }
            }
        })
        const arrayBalance = cards.map(item => {
            return item.dataValues.balance
        })
        arrayBalance.forEach(async (item) => {
            const newBalance = item - 10000
            const updateBalance = await Card.update({ balance: newBalance }, {
                where: {
                    userId: {
                        [Op.ne]: null
                    },
                    balance: { //tài khoản phải lớn hơn 10000 mới được trừ
                        [Op.gt]: 10000,
                        [Op.eq]: item
                    }
                }
            })
        })
    },
    null,
    true,
    'Asia/Ho_Chi_Minh'
)
job.start()

//CRUD card student
const findById = async (req, res) => {
    const { id } = req.params
    try {
        const cardStudent = await Card.findOne({
            where: { id: id }
        })
        if (cardStudent) {
            res.status(200).send(cardStudent)
        } else {
            throw new Error(`cannot find by id = ${id}`)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const getAllCard = async (req, res) => {
    try {
        const cardStudent = await Card.findAll()
        if (cardStudent) {
            res.status(200).send(cardStudent);
        } else {
            throw new Error("Cannot get all card")
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const createCard = async (req, res) => {
    const { mssv, school, balance } = req.body
    try {
        //find user have this mssv
        const user = await Users.findOne({
            where: {
                mssv: mssv,
            }
        })
        const checkCard = await Card.findAll({
            where: {
                userId: user.dataValues.id
            }
        })
        if (user.dataValues.userType === 'userOtherSchool' && checkCard.length === 0) {
            const newCard = await Card.create({ nameUser: user.dataValues.name, school: school, balance: balance, userId: user.dataValues.id })
            if (newCard) {
                res.status(201).send(newCard)
            } else {
                throw new Error("Cannot create new card")
            }
        }else if(checkCard.length !== 0){
            throw new Error(`This mssv did create card`)
        }else if(user.dataValues.userType !== 'userOtherSchool'){
            throw new Error("Cannot find this mssv")
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const updateCard = async (req, res) => {
    const { id } = req.params
    const { nameUser, school, balance } = req.body
    try {
        const card = await Card.update({ nameUser: nameUser, school: school, balance: balance }, {
            where: {
                id,
            }
        })
        if (card) {
            res.status(201).send(`Update card success with card id is ${id}`)
        } else {
            throw new Error(`Cannot update card with card id is ${id}`)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

const deleteCard = async (req, res) => {
    const { id } = req.params
    try {
        const card = await Card.destroy({
            where: {
                id,
            }
        })
        if (card) {
            res.status(200).send("delete card success")
        } else {
            throw new Error(`Cannot delete card with card id is ${id}`)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

//rechargeCard
const rechargeCard = async (req, res) => {
    const { id } = req.query
    const { balance } = req.body
    try {
        const card = await Card.findOne({
            where: {
                userId: id,
            }
        })

        if (card) {
            const newBalance = card.balance + balance
            const cardRecharged = await Card.update({ balance: newBalance }, {
                where: {
                    userId: id,
                }
            })
            try {
                if (cardRecharged) {
                    res.status(201).send("Recharge successful")
                }
                else {
                    throw new Error("Recharge failed")
                }
            } catch (e) {
                res.status(500).send(e)
            }
        } else {
            throw new Error(`Couldn't find card student by userId is ${id}`)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

const findByUserId = async (req, res) => {
    const { userId } = req.query
    try {
        const cardStudent = await Card.findOne({
            where: { userId: userId }
        })
        if (cardStudent) {
            res.status(200).send(cardStudent.dataValues)
        } else {
            throw new Error(`cannot find by userId = ${userId}`)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const getBalance = async (req, res) => {
    const { userId } = req.user
    try {
        const cardStudent = await Card.findOne({
            where: { userId: userId }
        })
        if (cardStudent) {
            res.status(200).send(cardStudent.dataValues)
        } else {
            throw new Error(`cannot find by userId = ${userId}`)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

//Export
module.exports = {
    findById,
    getAllCard,
    createCard,
    updateCard,
    deleteCard,
    rechargeCard,
    findByUserId,
    getBalance
}
