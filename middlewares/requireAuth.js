const jwt = require('jsonwebtoken');
const User = require('../models/user');


// POUR SECURISER LES ROUTE ON CREE LE MIDDELWARE

async function requireAuth(req, res, next){
    try {
        // Read the token OF cookie
        const token = req.cookies.Authorization;
        // Decode le Token
        const decoded = jwt.verify(token, process.env.SECRET);
        // check expiration du token
        if(Date.now()> decoded.exp)return res.sendStatus(403);

        // Find user using decoded sub (c'est id qu'on n'a save)
        const user= await User.findById(decoded.sub)
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Le user n'a pas était Trouvé",
            })
        }
        // attacher a user to a request
         req.user = user;
        // continu on
        next();

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

module.exports =requireAuth;  