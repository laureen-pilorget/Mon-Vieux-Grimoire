// import d'express
const express = require ('express');
// création de la constante app qui sera notre application, appeler la méthode express pour créer l'application express
const app = express();
// exporter l'application pour qu'on puisse y accéder depuis les autres fichiers du projet (le serveur node par exemple)
module.exports = app;