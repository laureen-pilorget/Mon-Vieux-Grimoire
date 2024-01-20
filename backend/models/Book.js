const mongoose = require('mongoose');

// On créé un schéma de données avec la méthode Schema
// avec toutes les informations dont nos objets auront besoin (type et caractère obligatoire ou non)
const bookSchema = mongoose.Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    year: { type: Number, required: true},
    category: { type: String, required: true},
    rate: { type: String, required: true},
    // description: { type: String, required: true},
    imageUrl: { type: String, required: true},
    // userId: { type: String, required: true},
    // price: { type:  Number, required: true},
});

// On exporte le schéma en tant que modèle mongoose appelé Thing, le rendant disponible pour notre application
module.exports = mongoose.model('Book', bookSchema);