const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
    try {
        const token = req.header("token")
        //giải mã (decode) token
        const decode = jwt.verify(token, "trinhhoangquan")
        if (decode) {
            //tạo ra một req user lấy dữ liệu được giải mã để đi authorization
            req.user = decode     
            next()
        }else{
            res.send("You are not loggin")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    authenticate,
}