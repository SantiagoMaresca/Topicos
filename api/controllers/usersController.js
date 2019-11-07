var User = require('../models/users');
const jwt = require('jsonwebtoken');
const bceypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';
const nodemailer = require('nodemailer');

// obtiene todas las transacciones
exports.getAllUser = function(req, res) {
    User.find(
        function(err, user) {
            if (err)
                res.send(err)
            res.json(user);
        }
    );
}

exports.getUserById = function(req, res) {
    let param = req.params.id
    User.findOne({ email: param }, (err, use) => {
        console.log(use)
        if (err)
            res.send(err)
        res.json(use);
    });
}

exports.setUser = function(req, res) {
    const newUser = {
        email: req.body.email,
        password: bceypt.hashSync(req.body.password),
        name: req.body.name,
        phone: req.body.phone
    }
    User.create(newUser,
        function(err, user) {
            if (err && err.code == 11000) return res.status(409).send('Email already exists');
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: user.id },
                SECRET_KEY, {
                    expiresIn: expiresIn
                });
            // Obtine y devuelve todas las personas tras crear una de ellas
            if (user) {
                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                return res.send({ dataUser });
            }
        });
}

exports.loginUser = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password

    }
    User.findOne({ email: userData.email }, (err, user) => {

        if (err) return res.status(500).send(err.message);
        if (!user) {
            //mail dosent exist
            console.log("Llega")
            res.status(404).send({ message: 'User dose not exists' });
            return res;

        } else {
            const resultPassword = bceypt.compareSync(userData.password, user.password);
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                return res.status(200).send({ dataUser });
            } else {
                //wrong password
                return res.status(409).send({ message: 'Something went wrong' });

            }
        }
    })
}

exports.updateScoreUser = async function(req, res) {
    const user2 = await User.findOne({ email: req.params.email })
    listaScore = user2.lscore

    listaScore.push(req.body.lscore);

    User.updateOne({ email: req.params.email }, { lscore: listaScore }, function(err, user) {
        if (err)
            res.send(err);
        User.findOne({ email: req.params.email }, (err, use) => {
            console.log(use)
            if (err)
                res.send(err)
            res.json(use);
        });
    })
}

exports.removeUser = function(req, res) {
    User.remove({ email: req.params.id }, function(err, user) {
        if (err)
            res.send(err);
        // Obtine y devuelve todas las personas tras borrar una de ellas
        User.find(function(err, use) {
            if (err)
                res.send(err)
            res.json("Deleted!");
        });
    });
}


exports.sendMail = function(req, res) {
    const mensaje = "new publication"
    const correoOrigen = "cambionelson.notifications@gmail.com"
    const asunto = "new publication at Cambio Nelson"
    var transport = nodemailer.createTransport({

        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: correoOrigen,
            pass: 'cambionelson123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: correoOrigen,
        to: "gonzalobarrioslorenzo@gmail.com",
        subject: asunto,
        text: mensaje + " responder a " + correoOrigen,
        //html: pulsa <a href="url/confirmacion?token">aquí</a> para activar tu cuenta
    };

    transport.sendMail(mailOptions, function(error, info) {
        // console.log(msg_str_altervpn_ini);
        if (error) {
            console.log(error.message);
            //callback(true);
        } else {
            console.log("correo enviado " + info.response);
            // callback(false);
        }
        transport.close();
        // console.log(msg_str_altervpn_fin);
    });

};