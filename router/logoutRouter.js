const express = require('express');
const { AuthenticateUserToken, blacklistedTokens } = require('../middleware/auth-user.js');
const logOutrouter = express.Router();

logOutrouter.post('/logout', AuthenticateUserToken, (req, res) => {
    const token = req.headers.authorization;


    blacklistedTokens.push(token);

    res.json({ status: 'Logged out successfully' });
});

module.exports = logOutrouter;
