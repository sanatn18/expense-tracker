import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET; //secret is needed to verify tokens later, ensuring they haven’t been tampered with.

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization Header:", authHeader); // check if the header exists

    const token = authHeader?.split(' ')[1];
    console.log("Token Extracted:", token); // verify if the token is correctly extracted

    if (!token) {
        console.log("Token missing. Sending 401.");
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log("JWT Verification Error:", err.message); // Log JWT errors
            return res.sendStatus(403); // Forbidden
        }

        console.log("JWT Verified Successfully. User:", user); // Log the decoded user
        req.user = user; // Attach user info to the request
        next();
    });
};
