const express = require('express')
const User = require('../models/user');
const UserRouter = express.Router();
const bcrypt = require('bcryptjs');

// Pour le signup 
UserRouter.post('/user/signup', async (req, res) => {
    try {
       const {email, password} = req.body;
       if(!email || !password) {
            return res.status(400).send({
                success: false, 
                message: "Il manque des données"
            });
        }
        
        let user = new User({email, password});
        await user.save();
        return res.status(200).send({
            success: true,
            message: "Un User a bien étais enregistrer",
            user
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

module.exports = UserRouter;