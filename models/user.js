const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // cela permet que chaque email soit unique dans la database
        lowercase: true,
        index: true,
    },
    password:{
        type: String,
        required: true,
    },
    // Nous avons rajouter cette parties apres avoir fini avec jwt
    notes:[ { type: mongoose.Schema.Types.ObjectId, ref: "Note" } ]
});

const User = mongoose.model('User',UserSchema);
module.exports = User;