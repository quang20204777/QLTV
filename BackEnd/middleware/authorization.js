//quyền chỉ dành riêng cho admin
const adminAuthorize = (req, res, next) => {
    const { user } = req
    if (["admin"].findIndex(e => e === user.userType) > -1) {
        next()
    }
    else{
        res.status(400).send("You cannot use this permission")
    }
}

//quyền dành cho user bao gồm cả sinh viên trong lẫn ngoài trường
const userAuthorize = (req, res, next) => {
    const { user } = req
    if (["user"].findIndex(e => e === user.userType) > -1) {
        next()
    }else if(["userOtherSchool"].findIndex(e => e === user.userType) > -1) {
        next()
    }else{
        res.status(400).send("You cannot use this permission")
    }
}

//quyền dành cho sinh viên ngoài trường
const userOtherSchoolAuthorize = (req, res, next) => {
    const { user } = req
    if (["userOtherSchool"].findIndex(e => e === user.userType) > -1) {
        next()
    }
    else{
        res.status(400).send("You cannot use this permission")
    }
}

//quyền dành cho cả 3 đối tượng là user, userOtherSchool hay admin
const allAuthorize = (req, res, next) => {
    const { user } = req
    if (["user"].findIndex(e => e === user.userType) > -1) {
        next()
    }else if(["userOtherSchool"].findIndex(e => e === user.userType) > -1) {
        next()
    }else if(["admin"].findIndex(e => e === user.userType) > -1) {
        next()
    }else{
        res.status(400).send("You cannot use this permission")
    }
}

module.exports = {
    adminAuthorize,
    userAuthorize,
    userOtherSchoolAuthorize,
    allAuthorize,
}