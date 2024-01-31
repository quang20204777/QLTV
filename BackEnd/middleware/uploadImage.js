const multer = require('multer')


const uploadImage = () => {
    const storage = multer.diskStorage({
        //tạo đường dẫn gửi ảnh đến
        destination: function (req, file, cb) {
            cb(null, './public/avatarBook')
        },
        //tạo tên ảnh (khác nhau về thời gian gửi)
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix+file.originalname)
        }
    })
    const upload = multer({
        storage: storage,
        //filter chỉ chấp nhận những file có đuôi là .png, .jpg, .jpeg
        fileFilter: function(req, file, cb){
            const extension = [".png", ".jpg"]
            const extensionOriginFile = file.originalname.slice(-4)
            const checkExtension = extension.includes(extensionOriginFile)
            if(checkExtension){
                cb(null, true)
            }else{
                cb(new Error('Extension file invalid'), false)
            }
        }
    }).single('file')
    return upload
}


module.exports = {
    uploadImage,
}
