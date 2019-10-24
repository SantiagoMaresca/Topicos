var User = require('../models/users');

// obtiene todas las transacciones
exports.getAllUser = function (req, res) {
	User.find(
		function (err, user) {
			if (err)
				res.send(err)
			res.json(user);
		}
	);
}

exports.getUserById = function (req, res) {
	let param = req.params.id
	User.findOne({ email: param }, (err, use) => {
		console.log(use)
		if (err)
			res.send(err)
		res.json(use);
	}
	);
}

exports.setUser = function (req, res) {
	User.create(
		{ email: req.body.email, password: req.body.password, name: req.body.name, phone: req.body.phone },
		function (err, user) {
			if (err)
				res.send(err);
			// Obtine y devuelve todas las personas tras crear una de ellas
			User.find(function (err, user) {
				if (err)
					res.send(err)
				res.json(user);
			});
		});
}

exports.updateScoreUser = function (req, res) {
	User.updateOne({ email: req.params.email}, {score: req.body.score }, function (err, user) {
		if(err)
			res.send(err);
			User.findOne({ email: req.params.email }, (err, use) => {
				console.log(use)
				if (err)
					res.send(err)
				res.json(use);
			}
			);
	})
}

exports.removeUser = function (req, res) {
	User.remove({ email: req.params.id }, function (err, user) {
		if (err)
			res.send(err);
		// Obtine y devuelve todas las personas tras borrar una de ellas
		User.find(function (err, use) {
			if (err)
				res.send(err)
			res.json("Deleted!");
		});
	});
}