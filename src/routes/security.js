const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');
const jwt = require('jsonwebtoken');


//Visualizar Personas
router.post("/login", (req, res) => {
    const body = req.body;
    console.log(body.userName);
    let user;           

    mysqlConnection.query("Select * from usuarios where userName = ?", body.userName, (err, rows, field) => {
        if (!err) {
            user = rows[0];
            if (user === undefined) {
                return res.status(401).send('Usuario no Existe');
            }
            if (body.password === user.password) {
                const token = jwt.sign({_id: user.id }, 'secret', { expiresIn: '1m' });
                return res.status(200).json({ token });
            } else {
                return res.status(401).send('Logeo Invalido');
            }
        } else {
            return res.status(500).send(err);
        }
    });
});

module.exports = router;


