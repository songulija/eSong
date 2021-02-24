const notFound = function (req, res, next) {
    const error = new Error(`Not Found - ${req.originalUrl}`);//if res.status code is 200 make it 500 else ..
    //inside status code we want to set code before throwing errror. set it whatever we want
    res.status(404);
    next(error);
}


const errorHandler = function (err, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;//if res.status code is 200 make it 500 else ..
    //inside status code we want to set code before throwing errror. set it whatever we want
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}


export { notFound, errorHandler }