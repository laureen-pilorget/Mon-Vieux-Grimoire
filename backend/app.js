// import d'express
const express = require ('express');
// création de la constante app qui sera notre application, appeler la méthode express pour créer l'application express
const app = express();
// méthode use avec une fonction qui reçoit la requête et la réponse 
// et utilisation de l'objet réponse avec la méthode json pour renvoyer une réponse en json
app.use((req, res) => {
    res.json({message: 'Votre requête a bien été reçue'});
});
// exporter l'application pour qu'on puisse y accéder depuis les autres fichiers du projet (le serveur node par exemple)
module.exports = app;