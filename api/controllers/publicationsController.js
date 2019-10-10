var Publications = require('../models/publications');

// Obtiene todos los objetos Persona de la base de datos
exports.getAllPublications = function (req, res){
	Publications.find(
		function(err, persona) {
			if (err)
				res.send(err)
					res.json(persona); // devuelve todas las Personas en JSON		
				}
			);
}

// Guarda un objeto Persona en base de datos
exports.setPublicacion = function(req, res) {

    console.log(req.body);
		// Creo el objeto Persona
		Publications.create(
			{quantity : req.body.quantity,badge: req.body.badge, place: req.body.place, user: req.body.user}, 
			function(err, publications) {
				if (err)
					res.send(err);
				// Obtine y devuelve todas las personas tras crear una de ellas
				Publications.find(function(err, publications) {
				 	if (err)
				 		res.send(err)
				 	res.json(publications);
				});
			});

	}

/*// Modificamos un objeto Persona de la base de datos
exports.updatePersona = function(req, res){
	Persona.update( {_id : req.params.persona_id},
					{$set:{nombre : req.body.nombre,apellido: req.body.apellido, edad: req.body.edad}}, 
					function(err, persona) {
						if (err)
							res.send(err);
				// Obtine y devuelve todas las personas tras crear una de ellas
				Persona.find(function(err, persona) {
				 	if (err)
				 		res.send(err)
				 	res.json(persona);
				});
			});
	}

// Elimino un objeto Persona de la base de Datos
exports.removePersona = function(req, res) {
	Persona.remove({_id : req.params.persona_id}, function(err, persona) {
		if (err)
			res.send(err);
			// Obtine y devuelve todas las personas tras borrar una de ellas
			Persona.find(function(err, persona) {
				if (err)
					res.send(err)
				res.json(persona);
			});
		});
}*/