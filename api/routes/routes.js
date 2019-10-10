var Persona = require('../models/publications');
var Controller = require ('../controllers/publicationsController');

module.exports = function(app) {

	// devolver todas las publicaciones
	app.get('/api/publication', Controller.getAllPublications);
	// Crear una nueva publicacion
	app.post('/api/publication', Controller.setPublicacion);
	// Modificar los datos de una Persona
	//app.put('/api/persona/:persona_id', Controller.updatePersona);
	// Borrar una Publicacion
	//app.delete('/api/persona/:persona_id', Controller.removePersona);
	// application 
	app.get('*', function(req, res) {
		res.sendfile('./angular/index.html'); // Carga única de la vista
	});
};