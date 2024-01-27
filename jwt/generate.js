const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.SECRET

function generateAccessToken(id,email,userName) {

    return jwt.sign({id,email,userName}, SECRET, { expiresIn: '36000s' });
}


module.exports={generateAccessToken}