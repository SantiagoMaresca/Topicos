var Persona = require('../models/publications');
var Controller = require ('../controllers/publicationsController');
var offerController = require ('../controllers/offersController');

module.exports = function(app) {

	// devolver todas las publicaciones
    app.get('/api/publication', Controller.getAllPublications);
    // devolver una publicacion por id
	app.get('/api/publication/:id', Controller.getPublicationById);
	//Devolver las publicaciones de un usuario
	app.get('/api/publicationUser/:email', Controller.getAllPublicationsUser);
	// Crear una nueva publicacion
	app.post('/api/publication', Controller.setPublicacion);
	// Eliminar los datos de una Persona
	app.delete('/api/publication/:id', Controller.removePublication);
	//app.put('/api/persona/:persona_id', Controller.updatePersona);
	// Borrar una Publicacion
	//app.delete('/api/persona/:persona_id', Controller.removePersona);
	// application 
	app.get('*', function(req, res) {
		res.sendfile('./angular/index.html'); // Carga única de la vista
	});

	//-------------------------ofertas-------------------------//

};