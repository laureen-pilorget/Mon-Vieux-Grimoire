// importation du package HTTP de node
const http = require('http');
// Importation du fichier app.js
const app = require('./app');

// indication du port sur lequel l'app va tourner grâce à la méthode set
app.set('port', process.env.PORT || 3000);

// création d'un serveur en appelant la méthode createServer avec passage de l'argument app dans la fonction server
const server = http.createServer(app);

// écoute/ attente des requêtes envoyées grâce à la méthode listen. On écoute le port 3000 par défaut,
// mais s'il n'est pas disponible, utilisation de la variable environnement 'env' 
server.listen(process.env.PORT || 3000);