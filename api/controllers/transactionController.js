var Transaction = require('../models/transaction');

exports.getAllTransaction = function (req, res){
	Transaction.find(
		function(err, transaction) {
			if (err)
				res.send(err)
					res.json(transaction);	
				}
			);
}

exports.getAllTransactionUser = function (req, res){
	let param = req.params.email
	Transaction.find(
		{user: param}, (err, pub)=> {
			if (err)
				res.send(err)
					res.json(pub);	
				}
			);
}

exports.getTransactionById = function (req, res){
	let param = req.params.id
	Transaction.findOne({_id: param}, (err, pub)=> {
		console.log(pub)
			if (err)
				res.send(err)
					res.json(pub); 	
				}
			);
}

exports.setTransaction = function(req, res) {
    Transaction.create(
			{quantity : req.body.quantity,badge: req.body.badge, place: req.body.place, user: req.body.user}, 
			function(err, publications) {
				if (err)
					res.send(err);
				// Obtine y devuelve todas las personas tras crear una de ellas
				Transaction.find(function(err, publications) {
				 	if (err)
				 		res.send(err)
				 	res.json(publications);
				});
			});

	}

exports.removeTransaction = function(req, res) {
	Transaction.remove({_id : req.params.id}, function(err, persona) {
			if (err)
				res.send(err);
				// Obtine y devuelve todas las personas tras borrar una de ellas
				Transaction.find(function(err, pub) {
					if (err)
						res.send(err)
					res.json("Deleted!");
				});
			});
		}