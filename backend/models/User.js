const mongoose = require('mongoose');
// Ajout du validator comme plugin à notre schéma
const uniqueValidator = require ('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// on l'applique au schéma avant d'en faire un modèle
// Avec le modèle comme ça, on ne pourra pas avoir plusieurs utilisateurs avec la même adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);