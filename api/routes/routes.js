var ControllerPub = require ('../controllers/publicationsController');
var ControllerBadge = require ('../controllers/badgeController');
var offerController = require ('../controllers/offersController');
var transactionController = require ('../controllers/transactionController');
var userController = require('../controllers/usersController');

module.exports = function(app) {

	/** ########## PUBLICACIONES ################################################## */
	// devolver todas las publicaciones
    app.get('/api/publication', ControllerPub.getAllPublications);
    // devolver una publicacion por id
	app.get('/api/publication/:id', ControllerPub.getPublicationById);
	//Devolver las publicaciones de un usuario
	app.get('/api/publicationUser/:email', ControllerPub.getAllPublicationsUser);
	// Crear una nueva publicacion
	app.post('/api/publication', ControllerPub.setPublicacion);
	// Eliminar los datos de una Persona
	app.delete('/api/publication/:id', ControllerPub.removePublication);

	/** ########## DIVISAS ################################################## */
	//Obtiene todas las divisas
	app.get('/api/badge', ControllerBadge.getAllBadge);
	//Creo una divisa
	app.post('/api/badge', ControllerBadge.setPublicacion);

	/** ########## OFERTAS ################################################## */
	app.get('/api/offer', offerController.getAllOffers);

	app.get('/api/offer/:id', offerController.getOfferById);

	app.get('/api/offer/publication/:publication', offerController.getAlloffersPublication);

	app.get('/api/offer/user/:email', offerController.getOffersByUser);

	app.post('/api/offer', offerController.setOffer);

	app.delete('/api/offer/:id', offerController.removeOffer);

	/** ########## TRANSACCIONES ################################################## */
	app.get('/api/transaction', transactionController.getAllTransaction);
    
	app.get('/api/transaction/:id', transactionController.getTransactionById);
	
	app.get('/api/offerTransaction/:OfferId', transactionController.getAllTransactionOffer);
    
	app.get('/api/userTransaction/:userId', transactionController.getTransactionUser);
	
	app.post('/api/transaction', transactionController.setTransaction);
	
	app.delete('/api/transaction/:id', transactionController.removeTransaction);

	
	/** ########## USUARIOS ################################################## */
	app.get('/api/user', userController.getAllUser);
    // Obtiene un usuario por email
	app.get('/api/user/:id', userController.getUserById);
	// Agrega un usuario
	app.post('/api/user', userController.setUser);
	// Actualiza score de un usuario
	app.put('/api/user/:email', userController.updateScoreUser);
	//
	app.delete('/api/user/:id', userController.removeUser);

	app.get('*', function(req, res) {
		res.sendfile('./angular/index.html'); // Carga única de la vista
	});

};