// import d'express
const express = require('express');

// création de la constante app qui sera notre application, appeler la méthode express pour créer l'application express
const app = express();
app.use(express.json());
const Book = require('./models/Book')
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://laureenpilo:h6n8LSoYZDSaFlYW@cluster0.apxtpog.mongodb.net',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création d'un middleware général (pas de route précisée)
// car appliqué à toutes les routes, toutes les requêtes envoyées à notre serveur
app.use((req, res, next) => {
  // Ajout de headers : pour dire qu'on peut accéder à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Autorisation d'utiliser certains headers sur l'objet requête
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Pour envoyer des requêtes avec les méthodes mentionnées (GET, POST, PUT, DELETE, PATCH et OPTIONS)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Pour intercepter uniquement les requêtes post
// 201 est le code pour création de ressource
app.post('/api/books', (req, res, next) => {
  console.log(req.body);
  delete req.body._id;
  const book = new Book({
    ...req.body
  });
  book.save()
    .then(() => res.status(201).json({ message: 'Merci ! votre livre a bien été publié'}))
    .catch(error => res.status(400).json({ error }));
});

app.use('/api/books', (req, res, next) => {
  //  Création d'un groupe d'articles avec le schéma de données spécifique requis par le front
  const stuff = [
    {
      // _id: 'oeihfzeoi',
      title: 'Milwaukee Mission',
      author: 'Elder Cooper',
      year: 2021,
      category: 'Policier',
      rate: '3',
      imageUrl: 'https://s3-alpha-sig.figma.com/img/5ccc/4259/8557d1328035a059629ef24ada741e6b?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=inQbqPCY4BgwQzc8K5GJg0iS1mGpgcgd1Kyy9XME9MDA6Ve3p1GFTIKsRqm~iTrwyxlmyXugw5hig17UVZgK03jIH54dqTpDB9~hRXH1L15Uiau4Jt1IfO18yt4wts6NBz~yA0BJm36m~vmw9Q-UtEnyfchmObDbVazmEQBbQBk46c2P5vAezn-mwZo5UiyghgtbD9XPxQ5xMVjyBr9jHgEdcEZ9mjKD47ASe~vI9aaudhsrNuWKvFV0FUuHVrVyK3xer9Q3bvZ3nzDdgkDpbskUWQPRZY6G2wwjnfG~KJRRlNRLmeY~KViVgZ5MsA6DsZdYmEf91Z4SuCz7-VZdtw__',
      // userId: 'qsomihvqios',
    },
    {
      // _id: 'oeihfzeomoihi',
      title: 'Book for Esther',
      author: 'Alabaster',
      category: 'Paysage',
      imageUrl: 'https://s3-alpha-sig.figma.com/img/2a59/f3a3/154d672a849c3474756104beccfa3fdf?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZRhtMQ0T~Zwi2PwNJsv9mdEcJBHL04oIw6cSz3OwKHCbFad0mcrGlIW6BQttT0cQopRgavxmafCilN0ZpuLdk-uF5R6B8WqtqKGQnzos~ZGPC7-z9OtNygySUM4vi1o8jma-Ay7DeNs7Z~6AExyIAZNMKHJDYwNu49vf6PH-xsG4s50RJaLbCyGQubm88GKUa82eYY93RNuHTM7v2T3lKXt2jcvD21R~7vLc2q6YDcON~u4CFl5vhFl3GpIbdqgfypz9sym6Jfrab8NyMFh84A4D2eDZ231c5p9exnqUsCUPGZOw5df8KwrIo7jkITnslvJOYZwtjV9wZoM619Qhzw__',
      rate: 4,
      // userId: 'qsomihvqios',
    },
  ];
  //  Envoi de ces articles sour la forme de données JSON, avec un code 200 pour une demande réussie
  res.status(200).json(stuff);
});

// Création du middleware pour retourner un objet avec la méthode get
app.get('/api/books/:id', (req, res, next) => {
  // utilisation du modèle mongoose Book avec la méthode findOne 
  // auquel on passe l'objet de comparaison : on veut que l'ID du livre soit le même que le paramètre de requête 
  Book.findOne({_id: req.params.id})
    // un promise 
    .then(book => res.status(200).json(book))
    // une erreur 404 pour objet non trouvé
    .catch(error => res.status(404).json({ error }));
});


// Création d'un middleware. 
// On lui passe la méthode get avec les arguments req pour request, res pour response et next pour passer l'exécution
// Mais aussi l'argument en string /api/stuff qui est la route pour laquelle on souhaite enregistrer cet élément middleware
app.get('/api/books', (req, res, next) => {
  // on lui demande renvoyer un tableau contenznt toutes les Things de la DB 
  Book.find()
    // Et de nous retourner soit les éléments créés en json, soit une erreur 400
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;