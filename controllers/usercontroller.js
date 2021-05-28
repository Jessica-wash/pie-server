const router = require('express').Router();
const { UserModel} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize');

let bOne = bcrypt.hashSync('password123', 13);


router.post('/register', async(req, res) => {
    const { firstName, lastName, email, password} = req.body;

    try{
        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 13)
        })

        const token = jwt.sign(
            {id: newUser.id,},
            process.env.JWT_SECRET ,  
            {expiresIn: 60 * 60 * 24}
        )

        res.status(201).json({
            msg: 'User registred!',
            user: newUser,
            token
        })
    } catch (error) {
        if(error instanceof UniqueConstraintError){
            res.status(409).json({
                msg: 'Email already in use'
            })
        } else (
            res.status(500).json({
                error: `Failed to register user: ${error}`
            })
        )
    }
})

module.exports = router;