import jwt from 'jsonwebtoken'

//when calling this function provide user id that we will store in JWT token 
const generateToken = (id) => {//first will be payload(data) which we'll store in token. which will be user id
    return jwt.sign({ id }, process.env.JWT_TOKEN, {//second argument is secret
        expiresIn: '2d'
    })//third argument of options. you can set token to expire in 30mins
}

export default generateToken;