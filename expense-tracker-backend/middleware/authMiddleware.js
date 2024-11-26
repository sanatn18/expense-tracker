import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET; //secret is needed to verify tokens later, ensuring they haven’t been tampered with.

// export const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1]; //check for the authorization header and use split(' ')[1] to get just the token part (the second part after "Bearer").
//     if(!token) return res.sendStatus(401);

//     jwt.verify(token, secret, (err, user)=>{ //uses jwt.verify to check if the token is valid
//         if(err) return res.sendStatus(403);
//         req.user = user; //user contains the decoded information from the token (like user.id). This assigns user to req.user, which can be accessed in the next middleware or route to identify the logged-in user
//         next(); //to proceed with the request, allowing the user access to the protected route.
//     });
// };

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization Header:", authHeader); // Check if the header exists

    const token = authHeader?.split(' ')[1];
    console.log("Token Extracted:", token); // Verify if the token is correctly extracted

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
        req.user = user;
        next();
    });
};
