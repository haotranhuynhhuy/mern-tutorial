const express = require('express');

const router = express.Router();
const User = require('../models/User');
const argon2 = require('argon2')
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth')

// @route Get api/auth
// @desc Check user is logged in 
// @access public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            res.status(400).json({ success: false, message: "User not found" })
        }
        res.json({
            success: true,
            user
        })
    } catch (error) {

    }
})

// @route POST api/auth/register
// @desc Register user 
// @access public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    //Simple validation 
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing username or password' })
    }

    try {
        //Check existing user
        const user = await User.findOne({ username });

        if (user) return res.status(401).json({ success: false, message: 'username is existed' })

        //All Good
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password: hashedPassword
        })
        await newUser.save();

        //Return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({
            success: true,
            message: 'User created successfully',
            accessToken
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messsage: 'Internal Server Error' })
    }
})


// @route POST api/auth/login
// @desc Login user 
// @access public

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    //Simple validation 
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing username or password' })
    }

    try {
        //Check existing username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Username or password incorrect' })
        }

        //Check Password 
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({ success: false, message: 'Username or password incorrect' })
        }

        //All good
        //Return token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messsage: 'Internal Server Error' })
    }
})

module.exports = router