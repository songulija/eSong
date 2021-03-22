import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()//we'll have router

//Returns a StorageEngine implementation configured to store files on the local file system.
//A string or function may be specified to determine the destination directory, and a function to determine filenames
const storage = multer.diskStorage({//initialize storage
    destination(req, file, cb) {//function takes req, file, and callback
        cb(null, 'uploads/')//call calback null becouse there's no error, and add file where we want to upload(file uploads)
    },
    filename(req, file, cb) {//A function that determines the name of the uploaded file
        //call calback. pass null for error, and name for file. we have access to file.fieldname
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)//add date, and extension of file(jpg, png ...)
        //path.extname it gets extension of file name, so we can pass file.originalname

    }
})

function checkFileType(file, cb) {//function to checkFileType, we need (png,  jpg ..)
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())//path.extname() its method on path object. it gets extension
    const mimetype = filetypes.test(file.mimetype)//check mimetap jpeg is image.jpeg ...

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}

//this is basically what we will pass as middleware to our route
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})

//when user makes post request to /api/upload. pass as middleware upload. we upload one. when we upload on frontend we call image
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})


export default router




