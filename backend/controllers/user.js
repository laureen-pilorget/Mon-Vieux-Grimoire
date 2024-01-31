const User = require('../models/User');
// importation du package de cryptage de mots de passes
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    // Ici on hash le mot de passe.
    // On appelle la méthode hash et on lui passe le mot de passe du corps de la requête 
    // et le salt -> combien de fois on exécute l'algorythme de hashage (ici c'est 10 fois)
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        // on enregistre ce hash dans un nouveau User dans la DB
        const user = new User({
            email: req.body.email,
            password: hash
        });
        // Ici on enregistre le user dans la base de données
        user.save()
        // On renvoie un code 201 pour une création de ressource
        .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => { 
    User.findOne({email: req.body.email})
    .then(user => {
        //  On vérifie si l'utilisateur à bien été trouvé
        if(user === null) {
            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
        } else {
            //  Si oui (on a bien trouvé l'utilisateur), 
            // alors on compare le mot de passe saisi par le client à celui enregistré dans la DB
            bcrypt.compare(req.body.password, user.password)
            .then(valid =>{
                // Si le mot de passe n'est pas valide on retourne un message d'erreur
                if (!valid) {
                    res.status(401).json ({message: 'Paire identifiant/mot de passe incorrecte'})
                } else {
                    // Sinon on délivre un token
                    res.status(200).json({
                        userId: user._id,
                        // utilisation de la méthode sign pour chiffrer un nouveau token
                        token: jwt.sign(
                            // cette méthode contient l'ID de l'utilisateur en tant que payload (données encod&es dans le token)
                            { userId: user._id },
                            // chaîne secrète de développement temporaire pour crypter le token
                            'RANDOM_TOKEN_SECRET',
                            // définition de la durée de validité du token
                            { expiresIn: '24h' }
                        )
                    });
                }
            })
            .catch(error => {res.status(500).json({error})})
        }
    })
    // Ici on gère l'erreur d'exécution de requête dans la DB, pas l'erreur lorsqu'il n'y a pas de champ trouvé dans la DB, 
    // lorsque l'utilisateur n'existe pas
    .catch(error => {res.status(500).json({error});
})
};