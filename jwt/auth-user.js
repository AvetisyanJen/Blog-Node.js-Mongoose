const jwt = require('jsonwebtoken');
const { SECRET } = require("../config");

function AuthenticateUserToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Missing or invalid token format" });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Unauthorized: Token has expired" });
            }
            return res.status(403).json({ error: "Forbidden: Invalid token" });
        }

        // Set user information in req.user
        req.user = decoded;

        next();
    });
}

module.exports = {
    AuthenticateUserToken
};


