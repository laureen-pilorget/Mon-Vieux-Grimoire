// le fichier controller sert à stocker toute la logique métier (pour chaque fonction de route)

const Book = require('../models/Book');

// Pour intercepter uniquement les requêtes post (pour l'instant on log à la console parce qu'on a pas encore de DB). 
// 201 est le code pour création de ressource
exports.createBook = (req, res, next) => {
    console.log(req.body);
    delete req.body._id;
    const book = new Book({
      ...req.body
    });
    book.save()
      .then(() => res.status(201).json({ message: 'Livre enregistré !'}))
      .catch(error => {
        console.log(error);
        res.status(400).json({ error })});
};

// Création du middleware pour retourner un objet avec la méthode get
exports.getOneBook = (req, res, next) => {
    // utilisation du modèle mongoose Book avec la méthode findOne 
    // à laquel on passe l'objet de comparaison : on veut que l'ID de l'objet en vente soit le même que le paramètre de requête 
    Book.findOne({_id: req.params.id})
      // un promise 
      .then(book => res.status(200).json(book))
      // une erreur 404 pour objet non trouvé
      .catch(error => res.status(404).json({ error }));
};

// Création d'un middleware. 
// On lui passe la méthode get avec les arguments req pour request, res pour response et next pour passer l'exécution
// Mais aussi l'argument en string /api/book qui est la route pour laquelle on souhaite enregistrer cet élément middleware
  exports.getAllBooks = (req, res, next) => {
    // on lui demande renvoyer un tableau contenant toutes les Books de la DB 
    Book.find()
      // Et de nous retourner soit les éléments créés en json, soit une erreur 400
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
};

// Création du middleware pour modifier un objet avec la méthode put
exports.modifyBook = (req, res, next) => {
    // utilisation du modèle mongoose Book avec la méthode updateOne 
    // à laquel on passe 2 arguments : l'objet de comparaison (on veut que l'ID de l'objet en vente soit le même que le paramètre de requête) 
    // ET le nouvel objet
    Book.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
      .then(() => res.status(200).json({message: 'Livre modifié !'}))
      .catch(error => res.status(400).json({error}));
};

// Création du middleware pour supprimer un objet avec la méthode delete
exports.deleteBook = (req, res, next) => {
    Book.deleteOne({_id: req.params.id})
      .then(() => res.status(200).json({message: 'Livre supprimé !'}))
      .catch(error => res.status(400).json({error}));
};