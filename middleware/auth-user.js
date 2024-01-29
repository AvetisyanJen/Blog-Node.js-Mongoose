// auth-user.js middleware
const jwt = require('jsonwebtoken');
const { SECRET } = require("../config");

const blacklistedTokens = [];

function AuthenticateUserToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Missing or invalid token format" });
    }

    if (blacklistedTokens.includes(token)) {
        return res.status(401).json({ error: "Unauthorized: Token has been invalidated (logged out)." });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err);

            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Unauthorized: Token has expired" });
            }

            return res.status(403).json({ error: `Forbidden: ${err.message || "Invalid token"}` });
        }

        if (!decoded || !decoded.id) {
            console.error('Invalid or missing decoded object:', decoded);
            return res.status(403).json({ error: "Forbidden: Invalid token" });
        }

        // Set user information in req.user
        req.user = { id: decoded.id.toString() };
// req.body.user=decoded.id.toString()
        next();
    });
}

module.exports = {
    AuthenticateUserToken,
    blacklistedTokens,
};

