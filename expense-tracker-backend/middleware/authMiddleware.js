import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET; //secret is needed to verify tokens later, ensuring they haven’t been tampered with.

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; //check for the authorization header and use split(' ')[1] to get just the token part (the second part after "Bearer").
    if(!token) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user)=>{ //uses jwt.verify to check if the token is valid
        if(err) return res.sendStatus(403);
        req.user = user; //user contains the decoded information from the token (like user.id). This assigns user to req.user, which can be accessed in the next middleware or route to identify the logged-in user
        next(); //to proceed with the request, allowing the user access to the protected route.
    });
};