var ControllerPub = require ('../controllers/publicationsController');
var ControllerBadge = require ('../controllers/badgeController');

module.exports = function(app) {

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
	//Obtiene todas las divisas
	app.get('/api/badge', ControllerBadge.getAllBadge);
	//Creo una divisa
	app.post('/api/badge', ControllerBadge.setPublicacion);
	app.get('*', function(req, res) {
		res.sendfile('./angular/index.html'); // Carga única de la vista
	});
};