import bcrypt from 'bcryptjs'

const users =[//creating array of users
    {//create three objects with exact same names as in userSchema
        name: 'Admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),//has password 10 times
        isAdmin: true
    },
    {//create three objects with exact same names as in userSchema
        name: 'John Song',
        email: 'John@example.com',
        password: bcrypt.hashSync('123456',10),
    },
    {//create three objects with exact same names as in userSchema
        name: 'Karol Smith',
        email: 'Karol@example.com',
        password: bcrypt.hashSync('123456',10),
    }
]

export default users;//export this array of users to use in other files