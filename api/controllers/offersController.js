const Offer = require('../models/offers');

// obtiene todas las ofertas
exports.getAllOffers = function (req, res){
	Offer.find(
		function(err, offers) {
			if (err)
				res.send(err)
					res.json(offers); // devuelve todas las ofertas en JSON		
				}
			);
}
// Obtiene una oferta por su id
exports.getOfferById = function (req, res){
	let param = req.params.id
	Offer.findOne(
		{_id: param}, (err, offer)=> {
			if (err)
				res.send(err)
					res.json(offer); // devuelve todas las ofertas en JSON		
				}
			);
}
// Obtiene las ofertas de un usuario
exports.getOffersByUser = function (req, res){
	let param = req.params.email
	Offer.find({user: param}, (err, ofertas)=> {
			if (err)
				res.send(err)
					res.json(ofertas); // devuelve todas las ofertas en JSON		
				}
			);
}
// Obtiene todas las ofertas de una publicacion
exports.getAlloffersPublication = function (req, res){
	let param = req.params.publication
	Offer.find({publication: param}, (err, ofertas)=> {

			if (err)
				res.send(err)
					res.json(ofertas); // devuelve todas las ofertas en JSON		
				}
			);
}

// crea una oferta
exports.setOffer = function(req, res) {
		Offer.create(
            {
                date: req.body.date, 
				quantity: req.body.quantity,
                badge: req.body.badge, 
                publication: req.body.publication,
                user: req.body.user
            }, 
			function(err, offer) {
				if (err)
					res.send(err);
				// Obtiene y devuelve todas las ofertas tras crear una de ellas
				Offer.find(function(err, offer) {
				 	if (err)
				 		res.send(err)
				 	res.json(offer);
				});
			});

    }


	

