// importation du package HTTP de node
const http = require('http');

// création d'un serveur en appelant la méthode createServer avec les arguments req et res
// dans la fonction qui renvoie la réponse avec la méthode end
const server = http.createServer((req, res) => {
    res.end('voilà la réponse du serveur');
});

// écoute/ attente des requêtes envoyées grâce à la méthode listen. On écoute le port 3000 par défaut,
// mais s'il n'est pas disponible, utilisation de la variable environnement 'env' 
server.listen(process.env.PORT || 3000);