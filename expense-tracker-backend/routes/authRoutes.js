import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const router = express.Router();
const secret = process.env.JWT_SECRET;

console.log('JWT Secret:', secret);

router.post('/register', async(req, res)=>{
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const user = new User({username, password:hashedPassword});

    try {
        await user.save();
        res.status(201).json({message: 'User Created'});
    } catch (error) {
        res.status(400).json({message: 'Error creating user'})

    }
});

//user login
router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' }); // This line uses the secret
    res.json({ token });
});


export default router;