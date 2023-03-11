const express = require('express')
const User = require('../models/user');
const UserRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        const hashedPassword = bcrypt.hashSync(password, 8);
        let user = new User({email, password : hashedPassword});
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

// Pour le login
UserRouter.post('/user/login', async (req,res) =>{
    // On recupere l'email et le password du req
    const {email, password} = req.body;
    // on trouve le user en fct de email
    let user = await User.findOne({email})
    //si ya pas user:
    if(!user){
        return res.status(404).send({
            success: false,
            message: "Le user n'a pas était Trouvé",
        })
    }
    // om compare le password avec celui hashé
    const passwordMatch= bcrypt.compareSync(password, user.password);
    if(!passwordMatch) return res.status(401) 

    // on cree la date d'expiration pour le token
    const exp =Date.now()+ 1000*60*60*24*30;
    // create a jwt token 
    const token = jwt.sign({ sub: user._id, exp  }, process.env.SECRET);//secret: corresponds aux .env

    // send it
    res.status(200).send({
        success: true,
        message: "Le token a bien étais enregistrer",
        token
    });
});

module.exports = UserRouter;